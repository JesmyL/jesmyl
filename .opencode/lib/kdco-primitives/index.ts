/**
 * Shared primitives for kdco registry plugins.
 *
 * This module provides common utilities extracted from multiple plugin files
 * to eliminate duplication and ensure consistent behavior across plugins.
 *
 * @module kdco-primitives
 */

// Project identification
export { getProjectId } from "./get-project-id"

// Logging
export { logWarn } from "./log-warn"
// Node runtime adapters (Bun API replacements)
export {
	type CapturedProcess,
	type CommandResult,
	type DetachedProcess,
	type DetachedSpawnOptions,
	resolveExecutable,
	runCommandSync,
	sleep,
	sleepSync,
	type SpawnOptions,
	spawnCaptured,
	spawnDetached,
	type SyncCommandOptions,
} from "./node-runtime"
// Concurrency
export { Mutex } from "./mutex"
// Shell escaping
export { assertShellSafe, escapeAppleScript, escapeBash, escapeBatch } from "./shell"
// Temp directory
export { getTempDir } from "./temp"
// Terminal detection
export {
	canUseCmuxWorkflow,
	detectCmuxContext,
	type CmuxContext,
	type CmuxEnvironment,
	type ResolveExecutable,
} from "./cmux"
export { isInsideTmux } from "./terminal-detect"
// Types
export type { OpencodeClient } from "./types"
// Timeout handling
export { TimeoutError, withTimeout } from "./with-timeout"
