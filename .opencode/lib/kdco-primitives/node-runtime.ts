/**
 * Node runtime adapters for kdco registry plugins.
 *
 * These helpers replace the Bun-specific runtime APIs (`Bun.spawn`,
 * `Bun.spawnSync`, `Bun.which`, `Bun.sleep`, `Bun.sleepSync`) with portable
 * Node.js equivalents. They keep the same observable semantics as the Bun
 * originals so plugin call sites remain small and declarative:
 *
 * - {@link resolveExecutable} mirrors `Bun.which`
 * - {@link runCommandSync} mirrors `Bun.spawnSync`
 * - {@link spawnCaptured} mirrors an awaited `Bun.spawn` with piped output
 * - {@link spawnDetached} mirrors `Bun.spawn({ detached: true }).unref()`
 *
 * @module kdco-primitives/node-runtime
 */

import { spawn, spawnSync } from "node:child_process"
import { accessSync, constants, statSync } from "node:fs"
import * as path from "node:path"
import type { Readable } from "node:stream"

// =============================================================================
// TYPES
// =============================================================================

/** Result of a synchronously executed command. */
export interface CommandResult {
	exitCode: number
	stdout: string
	stderr: string
	error?: Error
}

/**
 * Default maximum captured output per stream for {@link runCommandSync}.
 *
 * Node's `spawnSync` default is 1 MiB, which silently truncates verbose hook
 * output (e.g. `postCreate` scripts). 16 MiB is generous for command output
 * while still bounding memory; override per call via {@link SyncCommandOptions.maxBuffer}.
 */
const DEFAULT_MAX_BUFFER_BYTES = 16 * 1024 * 1024

/** Options for {@link runCommandSync}. */
export interface SyncCommandOptions {
	cwd?: string
	env?: NodeJS.ProcessEnv
	stdout?: "pipe" | "ignore" | "inherit"
	stderr?: "pipe" | "ignore" | "inherit"
	/** Maximum captured bytes per piped stream. Defaults to 16 MiB. */
	maxBuffer?: number
}

/** Options shared by the async spawn helpers. */
export interface SpawnOptions {
	cwd?: string
	env?: NodeJS.ProcessEnv
}

/** Options for {@link spawnDetached}. */
export interface DetachedSpawnOptions extends SpawnOptions {
	/**
	 * Invoked once if the child fails to spawn (ENOENT/EACCES/...). Node reports
	 * these asynchronously via the `'error'` event, so this can fire after
	 * {@link spawnDetached} has already returned.
	 */
	onError?: (error: Error) => void
}

/** Handle for a detached, fire-and-forget process. */
export interface DetachedProcess {
	/** OS process id, or `undefined` when the process has not spawned (yet). */
	readonly pid: number | undefined
	/**
	 * Resolves with the spawn error when the process failed to start, or with
	 * `null` once it spawned successfully. Never rejects.
	 */
	readonly waitError: Promise<Error | null>
}

/** A live child process whose output can be awaited. */
export interface CapturedProcess {
	/** Resolves with the process exit code; rejects when the process cannot start. */
	readonly exited: Promise<number>
	/** Resolves with the process stdout (empty when output is not captured). */
	stdoutText(): Promise<string>
	/** Resolves with the process stderr (empty when output is not captured). */
	stderrText(): Promise<string>
	/** Terminates the process. Best effort; safe to call after exit. */
	kill(signal?: NodeJS.Signals): void
}

// =============================================================================
// EXECUTABLE RESOLUTION (Bun.which replacement)
// =============================================================================

/** Options for {@link resolveExecutable}. */
export interface ResolveExecutableOptions {
	/** PATH-like search string. Defaults to `process.env.PATH`. */
	pathValue?: string
	/** PATHEXT-like extension list (Windows only). Defaults to `process.env.PATHEXT`. */
	pathExt?: string
	/** Target platform. Defaults to `process.platform`. */
	platform?: NodeJS.Platform
}

/**
 * Resolve a command name to an absolute executable path by searching PATH.
 *
 * Mirrors `Bun.which`: returns `null` when the command cannot be found or is
 * not executable. Path-like commands (containing `/` or `\`) are resolved
 * relative to the current working directory instead of PATH.
 */
export function resolveExecutable(
	command: string,
	options: ResolveExecutableOptions = {},
): string | null {
	const normalizedCommand = command.trim()
	if (!normalizedCommand) return null

	const platform = options.platform ?? process.platform

	if (isPathLike(normalizedCommand)) {
		const candidatePath = path.resolve(normalizedCommand)
		return isExecutableFile(candidatePath, platform) ? candidatePath : null
	}

	const candidateNames = buildWindowsCandidateNames(normalizedCommand, platform, options.pathExt)
	const searchDirectories = (options.pathValue ?? process.env.PATH ?? "")
		.split(path.delimiter)
		.filter(Boolean)

	for (const directory of searchDirectories) {
		for (const candidateName of candidateNames) {
			const candidatePath = path.join(directory, candidateName)
			if (isExecutableFile(candidatePath, platform)) return candidatePath
		}
	}

	return null
}

function isPathLike(command: string): boolean {
	return command.includes("/") || command.includes("\\")
}

function buildWindowsCandidateNames(
	command: string,
	platform: NodeJS.Platform,
	pathExt: string | undefined,
): string[] {
	if (platform !== "win32") return [command]

	const extensions = (pathExt ?? process.env.PATHEXT ?? ".COM;.EXE;.BAT;.CMD")
		.split(";")
		.map((extension) => extension.trim())
		.filter(Boolean)

	const alreadyHasExtension = extensions.some((extension) =>
		command.toLowerCase().endsWith(extension.toLowerCase()),
	)
	if (alreadyHasExtension) return [command]

	return [command, ...extensions.map((extension) => `${command}${extension}`)]
}

function isExecutableFile(candidatePath: string, platform: NodeJS.Platform): boolean {
	let stats: ReturnType<typeof statSync>
	try {
		stats = statSync(candidatePath)
	} catch {
		return false
	}

	if (!stats.isFile()) return false
	if (platform === "win32") return true

	try {
		accessSync(candidatePath, constants.X_OK)
		return true
	} catch {
		return false
	}
}

// =============================================================================
// SYNCHRONOUS EXECUTION (Bun.spawnSync replacement)
// =============================================================================

/**
 * Run a command synchronously with array arguments (never a shell string).
 * Returns decoded stdout/stderr plus the exit code.
 */
export function runCommandSync(argv: string[], options: SyncCommandOptions = {}): CommandResult {
	const [command, ...args] = argv
	if (!command) {
		throw new Error("runCommandSync requires a non-empty argv")
	}

	const result = spawnSync(command, args, {
		cwd: options.cwd,
		env: options.env,
		stdio: ["ignore", options.stdout ?? "pipe", options.stderr ?? "pipe"],
		encoding: "utf8",
		shell: false,
		maxBuffer: options.maxBuffer ?? DEFAULT_MAX_BUFFER_BYTES,
	})

	const stderrText = typeof result.stderr === "string" ? result.stderr : ""
	// On ENOENT/EACCES `spawnSync` reports the failure only through `error`,
	// leaving stderr empty. Surface it so callers never build empty messages.
	const stderr = stderrText || result.error?.message || ""

	return {
		exitCode: result.status ?? -1,
		stdout: typeof result.stdout === "string" ? result.stdout : "",
		stderr,
		error: result.error,
	}
}

// =============================================================================
// ASYNCHRONOUS EXECUTION (Bun.spawn replacement)
// =============================================================================

/**
 * Spawn a process and expose its captured output and exit status.
 *
 * Output collection starts immediately so no data is lost even if the caller
 * reads stdout/stderr after the process has already exited.
 */
export function spawnCaptured(argv: string[], options: SpawnOptions = {}): CapturedProcess {
	const [command, ...args] = argv
	if (!command) {
		throw new Error("spawnCaptured requires a non-empty argv")
	}

	const child = spawn(command, args, {
		cwd: options.cwd,
		env: options.env,
		stdio: ["ignore", "pipe", "pipe"],
		shell: false,
	})

	const stdoutPromise = collectStream(child.stdout)
	const stderrPromise = collectStream(child.stderr)
	const exited = new Promise<number>((resolve, reject) => {
		child.once("error", reject)
		child.once("close", (code) => resolve(code ?? -1))
	})

	// Callers may only read output; never leave a rejected promise unhandled.
	exited.catch(() => {})
	stdoutPromise.catch(() => {})
	stderrPromise.catch(() => {})

	return {
		exited,
		stdoutText: () => stdoutPromise,
		stderrText: () => stderrPromise,
		kill: (signal) => {
			try {
				child.kill(signal)
			} catch {
				// Process already exited - best-effort termination.
			}
		},
	}
}

/**
 * Spawn a detached, fire-and-forget process (`Bun.spawn({ detached: true }).unref()`).
 * The process keeps running after the host process exits.
 *
 * Node reports spawn failures (ENOENT/EACCES/...) asynchronously through the
 * `'error'` event rather than by throwing. The returned {@link DetachedProcess}
 * exposes that outcome via `waitError` (and the optional `onError` callback) so
 * callers can detect a failed launch and run a fallback instead of assuming
 * success.
 */
export function spawnDetached(
	argv: string[],
	options: DetachedSpawnOptions = {},
): DetachedProcess {
	const [command, ...args] = argv
	if (!command) {
		throw new Error("spawnDetached requires a non-empty argv")
	}

	const child = spawn(command, args, {
		cwd: options.cwd,
		env: options.env,
		detached: true,
		stdio: "ignore",
		shell: false,
	})

	const { onError } = options
	const waitError = new Promise<Error | null>((resolve) => {
		child.once("error", (error) => {
			const spawnError = error instanceof Error ? error : new Error(String(error))
			onError?.(spawnError)
			resolve(spawnError)
		})
		child.once("spawn", () => resolve(null))
	})

	child.unref()

	return { pid: child.pid, waitError }
}

async function collectStream(stream: Readable | null): Promise<string> {
	if (!stream) return ""

	const chunks: string[] = []
	stream.setEncoding("utf8")
	for await (const chunk of stream) {
		chunks.push(String(chunk))
	}
	return chunks.join("")
}

// =============================================================================
// TIMERS (Bun.sleep / Bun.sleepSync replacements)
// =============================================================================

/** Asynchronously wait for `ms` milliseconds. */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Synchronously block the current thread for `ms` milliseconds. */
export function sleepSync(ms: number): void {
	if (!Number.isFinite(ms) || ms <= 0) return

	const lock = new Int32Array(new SharedArrayBuffer(4))
	Atomics.wait(lock, 0, 0, ms)
}
