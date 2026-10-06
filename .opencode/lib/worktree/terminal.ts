/**
 * Terminal Module for Worktree Plugin
 *
 * Provides mutex-protected tmux operations and cross-platform terminal spawning.
 * Serializes tmux commands to prevent socket races since tmux server is single-threaded.
 *
 * This module is extracted from worktree.ts to provide a focused, testable
 * interface for terminal operations with proper concurrency control.
 */

import { randomUUID } from 'node:crypto';
import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { z } from 'zod';
import type {
  CmuxContext,
  CmuxEnvironment,
  DetachedProcess,
  OpencodeClient,
  ResolveExecutable,
} from '../kdco-primitives';
import {
  canUseCmuxWorkflow,
  detectCmuxContext,
  escapeAppleScript,
  escapeBash,
  escapeBatch,
  getTempDir,
  isInsideTmux,
  logWarn,
  Mutex,
  runCommandSync,
  sleep,
  spawnCaptured,
  spawnDetached,
  TimeoutError,
  resolveExecutable as whichExecutable,
  withTimeout,
} from '../kdco-primitives';

export {
  canUseCmuxWorkflow,
  detectCmuxContext,
  type CmuxContext,
  type CmuxEnvironment,
  type ResolveExecutable,
} from '../kdco-primitives';

// =============================================================================
// TEMP SCRIPT HELPER
// =============================================================================

/**
 * Execute a function with a temporary script file that is guaranteed to be cleaned up.
 * Uses try-finally pattern to ensure cleanup even on errors.
 *
 * @param scriptContent - Content to write to the temp script
 * @param fn - Function to execute with the script path
 * @param extension - File extension for the script (default: ".sh")
 * @returns Result of the function execution
 */
export async function withTempScript<T>(
  scriptContent: string,
  fn: (scriptPath: string) => Promise<T>,
  extension: string = '.sh',
  client?: OpencodeClient,
): Promise<T> {
  const scriptPath = path.join(
    getTempDir(),
    `worktree-${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`,
  );
  await fs.writeFile(scriptPath, scriptContent);
  await fs.chmod(scriptPath, 0o755);

  try {
    return await fn(scriptPath);
  } finally {
    try {
      // force: true makes this a no-op when the script already removed itself.
      await fs.rm(scriptPath, { force: true });
    } catch (cleanupError) {
      // Log but don't throw - cleanup is best-effort
      logWarn(client, 'worktree', `Failed to cleanup temp script: ${scriptPath}: ${cleanupError}`);
    }
  }
}

/**
 * Wrap a bash script with trap-based self-cleanup.
 * The script deletes itself on ANY exit (success, error, or signal).
 * This eliminates race conditions with detached processes.
 */
function wrapWithSelfCleanup(script: string): string {
  return `#!/bin/bash
trap 'rm -f "$0"' EXIT INT TERM
${script}`;
}

/**
 * Wrap a batch script with self-cleanup.
 * Uses goto trick to delete itself after execution.
 */
function wrapBatchWithSelfCleanup(script: string): string {
  return `@echo off
${script}
(goto) 2>nul & del "%~f0"`;
}

/** How long to wait for a detached spawn error before assuming success. */
const DETACHED_SPAWN_ERROR_GRACE_MS = 250;

/**
 * Wait briefly for a detached spawn to report a start failure.
 *
 * Node reports ENOENT/EACCES asynchronously, so a failed launch can only be
 * observed after `spawnDetached` returns. A terminal that fails fast is caught
 * within the grace window; an error arriving later is still logged through the
 * handle's `onError`, but is treated as success here to avoid blocking forever.
 */
async function waitForSpawnFailure(handle: DetachedProcess): Promise<Error | null> {
  return Promise.race([handle.waitError, sleep(DETACHED_SPAWN_ERROR_GRACE_MS).then(() => null)]);
}

/**
 * Launch a detached process that runs `scriptPath`, removing the script if the
 * launch fails. On success the script cleans itself up via its own trap.
 */
async function launchDetachedScript(
  argv: string[],
  scriptPath: string,
  terminalName: string,
  client?: OpencodeClient,
): Promise<TerminalResult> {
  const handle = spawnDetached(argv, {
    onError: error => {
      logWarn(client, 'worktree', `${terminalName} launch failed: ${error.message}`);
      // The process never started, so the script's trap will not fire.
      void fs.rm(scriptPath, { force: true }).catch(() => {});
    },
  });

  const spawnError = await waitForSpawnFailure(handle);
  if (!spawnError) return { success: true };

  await fs.rm(scriptPath, { force: true }).catch(() => {});
  return { success: false, error: `${terminalName} launch failed: ${spawnError.message}` };
}

/** Build Warp launch configuration YAML for Linux. */
function buildWarpLaunchConfigYaml(name: string, cwd: string, configPath: string, command?: string): string {
  const quotedName = JSON.stringify(name);
  const quotedCwd = JSON.stringify(cwd);
  const cleanupCommand = `rm -f "${escapeBash(configPath)}"`;
  const commands = [cleanupCommand];
  if (command) {
    commands.push(command);
  }
  const commandsBlock = `\n          commands:${commands
    .map(cmd => `\n            - exec: ${JSON.stringify(cmd)}`)
    .join('')}`;

  return `---
name: ${quotedName}
active_window_index: 0
windows:
  - active_tab_index: 0
    tabs:
      - layout:
          cwd: ${quotedCwd}${commandsBlock}
`;
}

/** Get Warp launch configuration directory for current platform user. */
function getWarpLaunchConfigDir(): string {
  const xdgDataHome = process.env.XDG_DATA_HOME ?? path.join(os.homedir(), '.local', 'share');
  return path.join(xdgDataHome, 'warp-terminal', 'launch_configurations');
}

// =============================================================================
// TYPES
// =============================================================================

/** Terminal type for the current platform */
export type TerminalType = 'tmux' | 'cmux' | 'macos' | 'windows' | 'linux-desktop';

/** Result of a terminal operation */
export interface TerminalResult {
  success: boolean;
  error?: string;
}

function normalizeArgv(argv?: string[]): string[] {
  if (!argv) {
    return [];
  }

  return argv;
}

export function buildBashCommandFromArgv(argv?: string[]): string | undefined {
  const normalizedArgv = normalizeArgv(argv);
  if (normalizedArgv.length === 0) {
    return undefined;
  }

  return normalizedArgv.map(arg => `"${escapeBash(arg)}"`).join(' ');
}

export function buildBatchCommandFromArgv(argv?: string[]): string | undefined {
  const normalizedArgv = normalizeArgv(argv);
  if (normalizedArgv.length === 0) {
    return undefined;
  }

  return normalizedArgv.map(arg => `"${escapeBatch(arg).replace(/"/g, '""')}"`).join(' ');
}

type CmuxCommandResult = {
  exitCode: number;
  stderr: string;
};
type RunCmuxCommand = (args: string[]) => CmuxCommandResult | Promise<CmuxCommandResult>;

export interface CmuxTerminalExecutionResult {
  terminalResult: TerminalResult;
  hasStateMutation: boolean;
}

const CMUX_COMMAND_TIMEOUT_MS = 1500;

// Singleton mutex for all tmux operations in this process
const tmuxMutex = new Mutex();

/** Stabilization delay after spawning tmux windows (ms) */
const STABILIZATION_DELAY_MS = 150;

// =============================================================================
// ENVIRONMENT DETECTION SCHEMAS
// =============================================================================

/** Validates WSL environment detection */
const wslEnvSchema = z.object({
  WSL_DISTRO_NAME: z.string().optional(),
  WSLENV: z.string().optional(),
});

/** Validates Linux terminal environment detection */
const linuxTerminalEnvSchema = z.object({
  KITTY_WINDOW_ID: z.string().optional(),
  WEZTERM_PANE: z.string().optional(),
  ALACRITTY_WINDOW_ID: z.string().optional(),
  GHOSTTY_RESOURCES_DIR: z.string().optional(),
  TERM_PROGRAM: z.string().optional(),
  GNOME_TERMINAL_SERVICE: z.string().optional(),
  KONSOLE_VERSION: z.string().optional(),
});

/** Environment variables for macOS terminal detection */
const macTerminalEnvSchema = z.object({
  TERM_PROGRAM: z.string().optional(),
  GHOSTTY_RESOURCES_DIR: z.string().optional(),
  ITERM_SESSION_ID: z.string().optional(),
  KITTY_WINDOW_ID: z.string().optional(),
  ALACRITTY_WINDOW_ID: z.string().optional(),
  __CFBundleIdentifier: z.string().optional(),
});

type LinuxTerminal =
  | 'kitty'
  | 'wezterm'
  | 'alacritty'
  | 'ghostty'
  | 'warp'
  | 'foot'
  | 'gnome-terminal'
  | 'konsole'
  | 'yakuake'
  | 'xfce4-terminal'
  | 'xdg-terminal-exec'
  | 'x-terminal-emulator'
  | 'xterm';

type MacTerminal = 'ghostty' | 'iterm' | 'warp' | 'kitty' | 'alacritty' | 'terminal';

// =============================================================================
// PLATFORM DETECTION
// =============================================================================

/**
 * Check if running inside WSL (Windows Subsystem for Linux).
 * Checks environment variables and os.release() for Microsoft string.
 */
function isInsideWSL(): boolean {
  const parsed = wslEnvSchema.safeParse(process.env);
  if (parsed.success && (parsed.data.WSL_DISTRO_NAME || parsed.data.WSLENV)) {
    return true;
  }

  // Fallback: check os.release() for Microsoft string
  try {
    return os.release().toLowerCase().includes('microsoft');
  } catch {
    return false;
  }
}

type PlatformTerminalType = Exclude<TerminalType, 'tmux' | 'cmux'>;

function detectPlatformTerminalType(): PlatformTerminalType {
  // WSL check (Linux inside Windows) - before platform detection
  if (process.platform === 'linux' && isInsideWSL()) {
    return 'windows'; // Use Windows Terminal via interop
  }

  // Platform-specific
  switch (process.platform) {
    case 'darwin':
      return 'macos';
    case 'win32':
      return 'windows';
    case 'linux':
      return 'linux-desktop';
    default:
      return 'linux-desktop';
  }
}

/**
 * Detect the best terminal type for the current platform.
 * Priority: tmux > cmux > WSL/platform-specific
 *
 * @returns The detected terminal type
 */
export function detectTerminalType(): TerminalType {
  // tmux takes priority - user may be inside tmux on any platform
  if (isInsideTmux()) {
    return 'tmux';
  }

  if (canUseCmuxWorkflow()) {
    return 'cmux';
  }

  return detectPlatformTerminalType();
}

// =============================================================================
// TMUX OPERATIONS (MUTEX-PROTECTED)
// =============================================================================

/**
 * Open a new tmux window with mutex protection.
 * Includes stabilization delay after spawning to prevent races.
 *
 * SECURITY NOTE: Branch names and paths are passed via array-based spawn
 * (runCommandSync with array arguments), NOT shell string interpolation.
 * This prevents command injection even if values contain special characters.
 * The tmux `-n` flag treats its argument as a literal window name string.
 *
 * @param options - Window configuration
 * @param options.sessionName - Optional tmux session name (uses current session if not specified)
 * @param options.windowName - Name for the new window
 * @param options.cwd - Working directory for the window
 * @param options.command - Optional command to execute in the window
 * @returns Success status and optional error message
 *
 * @example
 * ```ts
 * const result = await openTmuxWindow({
 *   windowName: "feature-branch",
 *   cwd: "/path/to/worktree",
 *   command: "opencode --session abc123",
 * })
 * if (!result.success) {
 *   console.error(result.error)
 * }
 * ```
 */
export async function openTmuxWindow(options: {
  sessionName?: string;
  windowName: string;
  cwd: string;
  argv?: string[];
}): Promise<TerminalResult> {
  const { sessionName, windowName, cwd, argv } = options;
  const command = buildBashCommandFromArgv(argv);

  return tmuxMutex.runExclusive(async () => {
    try {
      // Build tmux new-window command
      const tmuxArgs = ['new-window', '-n', windowName, '-c', cwd, '-P', '-F', '#{pane_id}'];

      // Add session target if specified
      if (sessionName) {
        tmuxArgs.splice(1, 0, '-t', sessionName);
      }

      // If there's a command to run, create script first and pass it to new-window
      if (command) {
        const scriptPath = path.join(getTempDir(), `worktree-${randomUUID()}.sh`);
        const escapedCwd = escapeBash(cwd);
        const scriptContent = wrapWithSelfCleanup(
          `cd "${escapedCwd}" || exit 1
${command}
exec $SHELL`,
        );
        await fs.writeFile(scriptPath, scriptContent);
        runCommandSync(['chmod', '+x', scriptPath]);

        // Add script execution to tmux args
        tmuxArgs.push('--', 'bash', scriptPath);
      }

      const createResult = runCommandSync(['tmux', ...tmuxArgs]);

      if (createResult.exitCode !== 0) {
        return {
          success: false,
          error: `Failed to create tmux window: ${createResult.stderr}`,
        };
      }

      // Stabilization delay to let tmux server process the window
      await sleep(STABILIZATION_DELAY_MS);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });
}

// =============================================================================
// CMUX OPERATIONS
// =============================================================================

export function buildCmuxCommandSequence(_context: CmuxContext, cwd: string, argv?: string[]): string[][] {
  // Product policy: each worktree launch gets a new cmux workspace.
  // We intentionally do not reuse the current workspace context.
  const cmuxArgs = ['new-workspace', '--cwd', cwd];
  const command = buildBashCommandFromArgv(argv);

  if (command) {
    cmuxArgs.push('--command', command);
  }

  return [cmuxArgs];
}

async function runCmuxCommandWithNode(cmuxCommand: string, args: string[]): Promise<CmuxCommandResult> {
  const proc = spawnCaptured([cmuxCommand, ...args]);

  try {
    const exitCode = await withTimeout(
      proc.exited,
      CMUX_COMMAND_TIMEOUT_MS,
      `cmux ${args[0]} timed out after ${CMUX_COMMAND_TIMEOUT_MS}ms`,
    );
    const stderr = await proc.stderrText();
    return {
      exitCode,
      stderr: stderr.trim(),
    };
  } catch (error) {
    if (error instanceof TimeoutError) {
      proc.kill();
    }

    throw error;
  }
}

export async function openCmuxTerminalWithState(
  cwd: string,
  argv?: string[],
  options?: {
    env?: CmuxEnvironment;
    resolveExecutable?: ResolveExecutable;
    runCmuxCommand?: RunCmuxCommand;
    cmuxCommand?: string;
  },
): Promise<CmuxTerminalExecutionResult> {
  if (!cwd) {
    return {
      terminalResult: { success: false, error: 'Working directory is required' },
      hasStateMutation: false,
    };
  }

  const env = options?.env ?? process.env;
  const cmuxCommand = options?.cmuxCommand ?? 'cmux';
  const resolveExecutable = options?.resolveExecutable ?? whichExecutable;
  if (!canUseCmuxWorkflow(env, resolveExecutable, cmuxCommand)) {
    return {
      terminalResult: { success: false, error: 'cmux environment not available' },
      hasStateMutation: false,
    };
  }

  const context = detectCmuxContext(env);
  const runCmuxCommand: RunCmuxCommand = options?.runCmuxCommand ?? (args => runCmuxCommandWithNode(cmuxCommand, args));
  const commandSequence = buildCmuxCommandSequence(context, cwd, argv);
  let hasStateMutation = false;

  for (const args of commandSequence) {
    let result: CmuxCommandResult;
    try {
      result = await runCmuxCommand(args);
    } catch (error) {
      const hasIndeterminateMutation = error instanceof TimeoutError;
      return {
        terminalResult: {
          success: false,
          error: `cmux ${args[0]} failed: ${error instanceof Error ? error.message : String(error)}`,
        },
        hasStateMutation: hasStateMutation || hasIndeterminateMutation,
      };
    }

    if (result.exitCode !== 0) {
      const stderr = result.stderr || 'unknown cmux error';
      return {
        terminalResult: {
          success: false,
          error: `cmux ${args[0]} failed: ${stderr}`,
        },
        hasStateMutation,
      };
    }

    hasStateMutation = true;
  }

  return { terminalResult: { success: true }, hasStateMutation };
}

export async function openCmuxTerminal(
  cwd: string,
  argv?: string[],
  options?: {
    env?: CmuxEnvironment;
    resolveExecutable?: ResolveExecutable;
    runCmuxCommand?: RunCmuxCommand;
    cmuxCommand?: string;
  },
): Promise<TerminalResult> {
  const result = await openCmuxTerminalWithState(cwd, argv, options);
  return result.terminalResult;
}

// =============================================================================
// MACOS TERMINAL
// =============================================================================

/**
 * Detect the current macOS terminal from environment variables.
 * Prioritizes terminal-specific env vars over TERM_PROGRAM for reliability.
 */
function detectCurrentMacTerminal(): MacTerminal {
  const env = macTerminalEnvSchema.parse(process.env);

  // Check specific env vars first (most reliable)
  if (env.GHOSTTY_RESOURCES_DIR) return 'ghostty';
  if (env.ITERM_SESSION_ID) return 'iterm';
  if (env.KITTY_WINDOW_ID) return 'kitty';
  if (env.ALACRITTY_WINDOW_ID) return 'alacritty';
  if (env.__CFBundleIdentifier === 'dev.warp.Warp-Stable') return 'warp';

  // Fallback to TERM_PROGRAM
  const termProgram = env.TERM_PROGRAM?.toLowerCase();
  switch (termProgram) {
    case 'ghostty':
      return 'ghostty';
    case 'iterm.app':
      return 'iterm';
    case 'warpterm':
      return 'warp';
    case 'apple_terminal':
      return 'terminal';
  }

  // Default to Terminal.app
  return 'terminal';
}

/**
 * Open terminal on macOS (Terminal.app, iTerm, Ghostty, etc.)
 * Detects current terminal and uses appropriate method.
 *
 * @param cwd - Working directory for the terminal
 * @param argv - Optional argv command to execute
 * @returns Success status and optional error message
 */
export async function openMacOSTerminal(cwd: string, argv?: string[]): Promise<TerminalResult> {
  // Guard: validate cwd
  if (!cwd) {
    return { success: false, error: 'Working directory is required' };
  }

  const escapedCwd = escapeBash(cwd);
  const command = buildBashCommandFromArgv(argv);
  const scriptContent = wrapWithSelfCleanup(
    command ? `cd "${escapedCwd}" && ${command}\nexec bash` : `cd "${escapedCwd}"\nexec bash`,
  );

  const terminal = detectCurrentMacTerminal();

  // Track script path for detached spawns to clean up on error
  let detachedScriptPath: string | null = null;

  // Handle terminals based on whether they use detached spawns
  try {
    switch (terminal) {
      // Ghostty uses inline command to avoid permission dialog - no temp script needed
      case 'ghostty': {
        const spawnError = await waitForSpawnFailure(
          spawnDetached([
            'open',
            '-na',
            'Ghostty.app',
            '--args',
            `--working-directory=${cwd}`,
            '-e',
            'bash',
            '-c',
            command ? `cd "${escapedCwd}" && ${command}` : `cd "${escapedCwd}"`,
          ]),
        );
        if (spawnError) {
          return { success: false, error: `Failed to open Ghostty: ${spawnError.message}` };
        }
        return { success: true };
      }

      // Detached terminals: write script directly - it self-deletes via trap
      // DO NOT use withTempScript for these - the finally block would delete
      // the script before the detached process reads it
      case 'kitty': {
        // Try kitty @ remote control first (synchronous, can use withTempScript)
        const remoteResult = await withTempScript(scriptContent, async scriptPath => {
          const result = runCommandSync([
            'kitty',
            '@',
            'launch',
            '--type',
            'tab',
            '--cwd',
            cwd,
            '--',
            'bash',
            scriptPath,
          ]);
          return result.exitCode === 0;
        });
        if (remoteResult) {
          return { success: true };
        }

        // Fallback: new window (detached) - write script directly
        detachedScriptPath = path.join(
          getTempDir(),
          `worktree-${Date.now()}-${Math.random().toString(36).slice(2)}.sh`,
        );
        await fs.writeFile(detachedScriptPath, scriptContent);
        await fs.chmod(detachedScriptPath, 0o755);

        const result = await launchDetachedScript(
          ['kitty', '--directory', cwd, '-e', 'bash', detachedScriptPath],
          detachedScriptPath,
          'kitty',
        );
        detachedScriptPath = null; // Ownership moved to the helper / script self-clean
        return result;
      }

      case 'alacritty': {
        // Detached spawn - write script directly
        detachedScriptPath = path.join(
          getTempDir(),
          `worktree-${Date.now()}-${Math.random().toString(36).slice(2)}.sh`,
        );
        await fs.writeFile(detachedScriptPath, scriptContent);
        await fs.chmod(detachedScriptPath, 0o755);

        const result = await launchDetachedScript(
          ['alacritty', '--working-directory', cwd, '-e', 'bash', detachedScriptPath],
          detachedScriptPath,
          'alacritty',
        );
        detachedScriptPath = null; // Ownership moved to the helper / script self-clean
        return result;
      }

      case 'warp': {
        // Detached spawn - write script directly
        detachedScriptPath = path.join(
          getTempDir(),
          `worktree-${Date.now()}-${Math.random().toString(36).slice(2)}.sh`,
        );
        await fs.writeFile(detachedScriptPath, scriptContent);
        await fs.chmod(detachedScriptPath, 0o755);

        const result = await launchDetachedScript(
          ['open', '-b', 'dev.warp.Warp-Stable', detachedScriptPath],
          detachedScriptPath,
          'warp',
        );
        detachedScriptPath = null; // Ownership moved to the helper / script self-clean
        return result;
      }

      // iTerm uses AppleScript `write text` which returns before execution completes.
      // Script must self-delete via trap — withTempScript would race.
      case 'iterm': {
        detachedScriptPath = path.join(
          getTempDir(),
          `worktree-${Date.now()}-${Math.random().toString(36).slice(2)}.sh`,
        );
        await fs.writeFile(detachedScriptPath, scriptContent);
        await fs.chmod(detachedScriptPath, 0o755);

        const escapedPath = escapeAppleScript(detachedScriptPath);
        const appleScript = `
				tell application "iTerm"
					if not (exists window 1) then
						reopen
					else
						tell current window
							create tab with default profile
						end tell
					end if
					activate
					tell first session of current tab of current window
						write text "${escapedPath}"
					end tell
				end tell
			`;
        const result = runCommandSync(['osascript', '-e', appleScript]);
        if (result.exitCode !== 0) {
          // Best-effort cleanup of orphaned script before returning
          try {
            await fs.rm(detachedScriptPath, { force: true });
          } catch {
            // Best-effort cleanup
          }
          return {
            success: false,
            error: `iTerm AppleScript failed: ${result.stderr}`,
          };
        }
        detachedScriptPath = null;
        return { success: true };
      }

      default: {
        // Terminal.app - waits for completion, safe to use withTempScript
        return await withTempScript(scriptContent, async scriptPath => {
          const proc = spawnCaptured(['open', '-a', 'Terminal', scriptPath]);
          const exitCode = await proc.exited;
          if (exitCode !== 0) {
            const stderr = await proc.stderrText();
            return { success: false, error: `Failed to open Terminal: ${stderr}` };
          }
          return { success: true };
        });
      }
    }
  } catch (error) {
    // Clean up orphaned script on error (matches Linux/Windows behavior)
    if (detachedScriptPath) {
      try {
        await fs.rm(detachedScriptPath);
      } catch {
        // Best-effort cleanup
      }
    }
    return {
      success: false,
      error: `Failed to open terminal: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

// =============================================================================
// LINUX TERMINAL
// =============================================================================

/**
 * Detect the current Linux terminal from environment variables.
 * Returns null if no terminal can be detected (use fallback chain).
 */
function detectCurrentLinuxTerminal(): LinuxTerminal | null {
  const env = linuxTerminalEnvSchema.parse(process.env);

  const termProgram = env.TERM_PROGRAM?.toLowerCase();

  // Check specific env vars first (most reliable)
  if (env.KITTY_WINDOW_ID) return 'kitty';
  if (env.WEZTERM_PANE) return 'wezterm';
  if (env.ALACRITTY_WINDOW_ID) return 'alacritty';
  if (env.GHOSTTY_RESOURCES_DIR) return 'ghostty';
  if (env.GNOME_TERMINAL_SERVICE) return 'gnome-terminal';

  // Yakuake embeds Konsole, so it must be checked first.
  if (termProgram === 'yakuake') return 'yakuake';

  if (env.KONSOLE_VERSION) return 'konsole';

  // TERM_PROGRAM fallback
  if (termProgram === 'warpterminal') return 'warp';
  if (termProgram === 'foot') return 'foot';

  return null;
}

type QdbusCommandResult = {
  exitCode: number;
  stderr: string;
};
type RunQdbusCommand = (args: string[]) => QdbusCommandResult | Promise<QdbusCommandResult>;

/**
 * Build the ordered qdbus6 command sequence that launches a script in a new
 * Yakuake session. Order matters: runCommand targets the session created by
 * addSession, so addSession must complete first.
 */
export function buildYakuakeCommandSequence(launchScriptPath: string): string[][] {
  return [
    ['qdbus6', 'org.kde.yakuake', '/yakuake/sessions', 'addSession'],
    ['qdbus6', 'org.kde.yakuake', '/yakuake/sessions', 'runCommand', launchScriptPath],
  ];
}

async function runQdbusCommand(args: string[]): Promise<QdbusCommandResult> {
  const result = runCommandSync(args);
  return {
    exitCode: result.exitCode,
    stderr: result.stderr,
  };
}

/**
 * Launch a script in a new Yakuake session via qdbus6.
 *
 * Commands run sequentially via synchronous spawns: each qdbus6 call is
 * awaited and must exit successfully before the next one is dispatched.
 * If addSession were fire-and-forget, runCommand could race the session
 * creation and target the previously active session.
 */
export async function openYakuakeTerminal(
  launchScriptPath: string,
  options?: {
    runCommand?: RunQdbusCommand;
  },
): Promise<TerminalResult> {
  const runCommand = options?.runCommand ?? runQdbusCommand;

  for (const args of buildYakuakeCommandSequence(launchScriptPath)) {
    let result: QdbusCommandResult;
    try {
      result = await runCommand(args);
    } catch (error) {
      return {
        success: false,
        error: `yakuake ${args[3]} failed: ${error instanceof Error ? error.message : String(error)}`,
      };
    }

    if (result.exitCode !== 0) {
      const stderr = result.stderr.trim() || 'unknown qdbus error';
      return {
        success: false,
        error: `yakuake ${args[3]} failed: ${stderr}`,
      };
    }
  }

  return { success: true };
}

/**
 * Open terminal on Linux with desktop environment detection.
 * Priority: current terminal > xdg-terminal-exec > x-terminal-emulator > modern > DE > xterm
 *
 * NOTE: All Linux terminal spawns are detached, so we write the script directly
 * instead of using withTempScript. The script self-deletes via trap.
 *
 * @param cwd - Working directory for the terminal
 * @param command - Optional command to execute
 * @returns Success status and optional error message
 */
export async function openLinuxTerminal(cwd: string, argv?: string[]): Promise<TerminalResult> {
  // Guard: validate cwd
  if (!cwd) {
    return { success: false, error: 'Working directory is required' };
  }

  const escapedCwd = escapeBash(cwd);
  const command = buildBashCommandFromArgv(argv);
  const scriptContent = wrapWithSelfCleanup(
    command ? `cd "${escapedCwd}" && ${command}\nexec bash` : `cd "${escapedCwd}"\nexec bash`,
  );

  let scriptPath: string | null = null;
  let warpConfigPath: string | null = null;

  const cleanupFile = async (filePath: string | null): Promise<void> => {
    if (!filePath) {
      return;
    }
    try {
      await fs.rm(filePath);
    } catch {
      // Best-effort cleanup
    }
  };

  const ensureScriptPath = async (): Promise<string> => {
    if (scriptPath) {
      return scriptPath;
    }

    // Write script directly - it self-deletes via trap
    // DO NOT use withTempScript - all Linux spawns are detached
    scriptPath = path.join(getTempDir(), `worktree-${Date.now()}-${Math.random().toString(36).slice(2)}.sh`);
    await fs.writeFile(scriptPath, scriptContent);
    await fs.chmod(scriptPath, 0o755);
    return scriptPath;
  };

  try {
    // Helper to try a terminal (all detached spawns)
    const tryTerminal = async (name: string, args: string[]): Promise<{ tried: boolean; success: boolean }> => {
      if (!whichExecutable(name)) {
        return { tried: false, success: false };
      }

      try {
        const spawnError = await waitForSpawnFailure(
          spawnDetached(args, {
            onError: error => logWarn(undefined, 'worktree', `Failed to launch ${name}: ${error.message}`),
          }),
        );
        return { tried: true, success: spawnError === null };
      } catch {
        return { tried: true, success: false };
      }
    };

    // 1. Check current terminal via env detection
    const currentTerminal = detectCurrentLinuxTerminal();
    if (currentTerminal) {
      let result: { tried: boolean; success: boolean };

      switch (currentTerminal) {
        case 'kitty': {
          const launchScriptPath = await ensureScriptPath();
          // Try remote control first (synchronous, script still needed after)
          const kittyRemote = runCommandSync([
            'kitty',
            '@',
            'launch',
            '--type',
            'tab',
            '--cwd',
            cwd,
            '--',
            'bash',
            launchScriptPath,
          ]);
          if (kittyRemote.exitCode === 0) {
            return { success: true };
          }
          result = await tryTerminal('kitty', ['kitty', '--directory', cwd, '-e', 'bash', launchScriptPath]);
          break;
        }
        case 'wezterm': {
          const launchScriptPath = await ensureScriptPath();
          result = await tryTerminal('wezterm', [
            'wezterm',
            'cli',
            'spawn',
            '--cwd',
            cwd,
            '--',
            'bash',
            launchScriptPath,
          ]);
          break;
        }
        case 'alacritty': {
          const launchScriptPath = await ensureScriptPath();
          result = await tryTerminal('alacritty', [
            'alacritty',
            '--working-directory',
            cwd,
            '-e',
            'bash',
            launchScriptPath,
          ]);
          break;
        }
        case 'ghostty': {
          const launchScriptPath = await ensureScriptPath();
          result = await tryTerminal('ghostty', ['ghostty', '-e', 'bash', launchScriptPath]);
          break;
        }
        case 'warp': {
          const configName = `worktree-${Date.now()}-${Math.random().toString(36).slice(2)}`;
          const configDir = getWarpLaunchConfigDir();
          const configPath = path.join(configDir, `${configName}.yaml`);
          warpConfigPath = configPath;
          const configContent = buildWarpLaunchConfigYaml(configName, cwd, configPath, command);

          await fs.mkdir(configDir, { recursive: true });
          await fs.writeFile(configPath, configContent);

          result = await tryTerminal('warp-terminal', [
            'warp-terminal',
            `warp://launch/${encodeURIComponent(configName)}`,
          ]);

          if (!result.success) {
            result = await tryTerminal('warp-terminal', [
              'warp-terminal',
              `warp://launch/${encodeURIComponent(`${configName}.yaml`)}`,
            ]);
          }

          if (!result.success) {
            await cleanupFile(warpConfigPath);
            warpConfigPath = null;
          }
          break;
        }
        case 'foot': {
          const launchScriptPath = await ensureScriptPath();
          result = await tryTerminal('foot', ['foot', '--working-directory', cwd, 'bash', launchScriptPath]);
          break;
        }
        case 'gnome-terminal': {
          const launchScriptPath = await ensureScriptPath();
          result = await tryTerminal('gnome-terminal', [
            'gnome-terminal',
            '--working-directory',
            cwd,
            '--',
            'bash',
            launchScriptPath,
          ]);
          break;
        }
        case 'konsole': {
          const launchScriptPath = await ensureScriptPath();
          result = await tryTerminal('konsole', ['konsole', '--workdir', cwd, '-e', 'bash', launchScriptPath]);
          break;
        }
        case 'yakuake': {
          const launchScriptPath = await ensureScriptPath();
          const yakuakeResult = await openYakuakeTerminal(launchScriptPath);
          result = { tried: true, success: yakuakeResult.success };
          break;
        }
        default:
          result = { tried: false, success: false };
      }

      if (result.success) {
        return { success: true };
      }
    }

    // 2. xdg-terminal-exec (modern XDG standard)
    const launchScriptPath = await ensureScriptPath();

    const xdgResult = await tryTerminal('xdg-terminal-exec', ['xdg-terminal-exec', '--', 'bash', launchScriptPath]);
    if (xdgResult.success) return { success: true };

    // 3. x-terminal-emulator (Debian/Ubuntu)
    const xteResult = await tryTerminal('x-terminal-emulator', ['x-terminal-emulator', '-e', 'bash', launchScriptPath]);
    if (xteResult.success) return { success: true };

    // 4. Modern terminals fallback
    const modernTerminals: Array<{ name: string; args: string[] }> = [
      { name: 'kitty', args: ['kitty', '--directory', cwd, '-e', 'bash', launchScriptPath] },
      {
        name: 'alacritty',
        args: ['alacritty', '--working-directory', cwd, '-e', 'bash', launchScriptPath],
      },
      {
        name: 'wezterm',
        args: ['wezterm', 'cli', 'spawn', '--cwd', cwd, '--', 'bash', launchScriptPath],
      },
      { name: 'ghostty', args: ['ghostty', '-e', 'bash', launchScriptPath] },
      { name: 'foot', args: ['foot', '--working-directory', cwd, 'bash', launchScriptPath] },
    ];

    for (const { name, args } of modernTerminals) {
      const result = await tryTerminal(name, args);
      if (result.success) return { success: true };
    }

    // 5. DE terminals fallback
    const deTerminals: Array<{ name: string; args: string[] }> = [
      {
        name: 'gnome-terminal',
        args: ['gnome-terminal', '--working-directory', cwd, '--', 'bash', launchScriptPath],
      },
      { name: 'konsole', args: ['konsole', '--workdir', cwd, '-e', 'bash', launchScriptPath] },
      {
        name: 'xfce4-terminal',
        args: ['xfce4-terminal', '--working-directory', cwd, '-x', 'bash', launchScriptPath],
      },
    ];

    for (const { name, args } of deTerminals) {
      const result = await tryTerminal(name, args);
      if (result.success) return { success: true };
    }

    // 6. Last resort: xterm
    const xtermResult = await tryTerminal('xterm', ['xterm', '-e', 'bash', launchScriptPath]);
    if (xtermResult.success) return { success: true };

    // No terminal found - clean up orphaned temp files
    await cleanupFile(scriptPath);
    await cleanupFile(warpConfigPath);
    scriptPath = null;
    warpConfigPath = null;
    return { success: false, error: 'No terminal emulator found' };
  } catch (error) {
    await cleanupFile(scriptPath);
    await cleanupFile(warpConfigPath);
    return {
      success: false,
      error: `Failed to spawn terminal: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

// =============================================================================
// WINDOWS TERMINAL
// =============================================================================

/**
 * Open terminal on Windows (Windows Terminal or cmd).
 * Tries Windows Terminal (wt.exe) first, falls back to cmd.exe.
 *
 * NOTE: All Windows terminal spawns are detached, so we write the script directly
 * instead of using withTempScript. The script self-deletes via goto trick.
 *
 * @param cwd - Working directory for the terminal
 * @param command - Optional command to execute
 * @returns Success status and optional error message
 */
export async function openWindowsTerminal(cwd: string, argv?: string[]): Promise<TerminalResult> {
  // Guard: validate cwd
  if (!cwd) {
    return { success: false, error: 'Working directory is required' };
  }

  const escapedCwd = escapeBatch(cwd);
  const command = buildBatchCommandFromArgv(argv);
  const scriptContent = wrapBatchWithSelfCleanup(
    command ? `cd /d "${escapedCwd}"\r\n${command}\r\ncmd /k` : `cd /d "${escapedCwd}"\r\ncmd /k`,
  );

  // Write script directly - it self-deletes via goto trick
  // DO NOT use withTempScript - all Windows spawns are detached
  const scriptPath = path.join(getTempDir(), `worktree-${Date.now()}-${Math.random().toString(36).slice(2)}.bat`);
  await fs.writeFile(scriptPath, scriptContent);
  await fs.chmod(scriptPath, 0o755);

  try {
    // Check for Windows Terminal
    const wtCheck = runCommandSync(['where', 'wt'], {
      stdout: 'pipe',
      stderr: 'pipe',
    });

    if (wtCheck.exitCode === 0) {
      const wtError = await waitForSpawnFailure(
        spawnDetached(['wt.exe', '-d', cwd, 'cmd', '/k', scriptPath], {
          onError: error => logWarn(undefined, 'worktree', `wt.exe launch failed: ${error.message}`),
        }),
      );
      if (!wtError) return { success: true };
      // Fall through to cmd.exe
    }

    // Fallback: cmd.exe
    const cmdError = await waitForSpawnFailure(
      spawnDetached(['cmd', '/c', 'start', '', scriptPath], {
        onError: error => logWarn(undefined, 'worktree', `cmd.exe launch failed: ${error.message}`),
      }),
    );
    if (!cmdError) return { success: true };

    // Failed to spawn - clean up orphaned script
    await fs.rm(scriptPath, { force: true }).catch(() => {});
    return { success: false, error: cmdError.message };
  } catch (error) {
    return {
      success: false,
      error: `Failed to spawn terminal: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

// =============================================================================
// WSL TERMINAL
// =============================================================================

/**
 * Open terminal in WSL via Windows Terminal interop.
 * Falls back to bash in current terminal if wt.exe not available.
 *
 * NOTE: All WSL terminal spawns are detached, so we write the script directly
 * instead of using withTempScript. The script self-deletes via trap.
 */
export async function openWSLTerminal(cwd: string, argv?: string[]): Promise<TerminalResult> {
  // Guard: validate cwd
  if (!cwd) {
    return { success: false, error: 'Working directory is required' };
  }

  const escapedCwd = escapeBash(cwd);
  const command = buildBashCommandFromArgv(argv);
  const scriptContent = wrapWithSelfCleanup(
    command ? `cd "${escapedCwd}" && ${command}\nexec bash` : `cd "${escapedCwd}"\nexec bash`,
  );

  // Write script directly - it self-deletes via trap
  // DO NOT use withTempScript - all WSL spawns are detached
  const scriptPath = path.join(getTempDir(), `worktree-${Date.now()}-${Math.random().toString(36).slice(2)}.sh`);
  await fs.writeFile(scriptPath, scriptContent);
  await fs.chmod(scriptPath, 0o755);

  try {
    // Try wt.exe first (Windows Terminal via PATH interop)
    const wtResult = runCommandSync(['which', 'wt.exe']);
    if (wtResult.exitCode === 0) {
      const wtError = await waitForSpawnFailure(
        spawnDetached(['wt.exe', '-d', cwd, 'bash', scriptPath], {
          onError: error => logWarn(undefined, 'worktree', `wt.exe launch failed: ${error.message}`),
        }),
      );
      if (!wtError) return { success: true };
      // Fall through to bash
    }

    // Fallback: open in current terminal (new bash process)
    const bashError = await waitForSpawnFailure(
      spawnDetached(['bash', scriptPath], {
        cwd,
        onError: error => logWarn(undefined, 'worktree', `bash launch failed: ${error.message}`),
      }),
    );
    if (!bashError) return { success: true };

    // Failed to spawn - clean up orphaned script
    await fs.rm(scriptPath, { force: true }).catch(() => {});
    return { success: false, error: bashError.message };
  } catch (error) {
    return {
      success: false,
      error: `Failed to spawn terminal: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

// =============================================================================
// UNIFIED TERMINAL OPENING
// =============================================================================

/**
 * Open a terminal window on the current platform.
 * Automatically detects the best terminal type and method.
 *
 * @param cwd - Working directory for the terminal
 * @param command - Optional command to execute
 * @param windowName - Optional window name (used for tmux)
 * @returns Success status and optional error message
 */
export async function openTerminal(
  cwd: string,
  argv?: string[],
  windowName?: string,
  options?: {
    detectTerminalType?: () => TerminalType;
    openCmuxTerminalWithState?: (cwd: string, argv?: string[]) => Promise<CmuxTerminalExecutionResult>;
    openPlatformTerminal?: (cwd: string, argv?: string[]) => Promise<TerminalResult>;
  },
): Promise<TerminalResult> {
  const terminalType = options?.detectTerminalType?.() ?? detectTerminalType();
  if (terminalType === 'cmux') {
    const cmuxResult = await (options?.openCmuxTerminalWithState ?? openCmuxTerminalWithState)(cwd, argv);
    if (cmuxResult.terminalResult.success) {
      return cmuxResult.terminalResult;
    }

    if (!cmuxResult.hasStateMutation) {
      return (options?.openPlatformTerminal ?? openPlatformTerminal)(cwd, argv);
    }

    return cmuxResult.terminalResult;
  }

  return openTerminalByType(terminalType, cwd, argv, windowName);
}

async function openPlatformTerminal(cwd: string, argv?: string[]): Promise<TerminalResult> {
  const platformTerminalType = detectPlatformTerminalType();
  return openTerminalByType(platformTerminalType, cwd, argv);
}

async function openTerminalByType(
  terminalType: Exclude<TerminalType, 'cmux'>,
  cwd: string,
  argv?: string[],
  windowName?: string,
): Promise<TerminalResult> {
  if (terminalType === 'tmux') {
    return openTmuxWindow({
      windowName: windowName || 'worktree',
      cwd,
      argv,
    });
  }

  switch (terminalType) {
    case 'macos':
      return openMacOSTerminal(cwd, argv);

    case 'windows':
      // Check if we're in WSL
      if (process.platform === 'linux' && isInsideWSL()) {
        return openWSLTerminal(cwd, argv);
      }
      return openWindowsTerminal(cwd, argv);

    case 'linux-desktop':
      return openLinuxTerminal(cwd, argv);

    default:
      return { success: false, error: `Unsupported terminal type: ${terminalType}` };
  }
}
