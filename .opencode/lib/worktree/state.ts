/**
 * JSON State Module for Worktree Plugin
 *
 * Provides atomic, process-crash-safe persistence for worktree sessions and
 * pending operations using a single JSON document per project. A process crash
 * mid-write leaves either the old or the new complete document (temp file +
 * atomic rename), never a torn file.
 *
 * State location: ~/.local/share/opencode/plugins/worktree/{project-id}.json
 * Project ID is the first git root commit SHA (40-char hex), with SHA-256 path
 * hash fallback (16-char).
 *
 * Persisted shape:
 * ```json
 * {
 *   "sessions": [ ... ],
 *   "pendingSpawn": { "branch": "...", "path": "...", "sessionId": "..." },
 *   "pendingDelete": { "branch": "...", "path": "..." }
 * }
 * ```
 *
 * Writes are atomic (temp file + rename). Cross-process read-modify-write
 * critical sections are serialized with an `O_CREAT|O_EXCL` lockfile next to
 * the JSON (`{state}.lock`), with stale-lock recovery, so concurrent processes
 * cannot lose each other's updates. Transient filesystem rename contention
 * (EBUSY/EPERM/EACCES) is retried briefly while holding the lock.
 */

import { randomUUID } from "node:crypto"
import {
	closeSync,
	existsSync,
	mkdirSync,
	openSync,
	readFileSync,
	renameSync,
	statSync,
	unlinkSync,
	writeFileSync,
} from "node:fs"
import * as os from "node:os"
import * as path from "node:path"
import { z } from "zod"
import { sleepSync, type OpencodeClient } from "../kdco-primitives"
import { getProjectId, logWarn } from "../kdco-primitives"
import { parsePersistedLaunchMetadata, serializePersistedLaunchMetadata } from "./launch-context"

// =============================================================================
// TYPES
// =============================================================================

/** Represents an active worktree session */
export interface Session {
	id: string
	branch: string
	path: string
	createdAt: string
	launchMode: "plain" | "ocx"
	profile: string | null
	ocxBin: string | null
}

export type SessionInput = Omit<Session, "launchMode" | "profile" | "ocxBin"> & {
	launchMode?: "plain" | "ocx"
	profile?: string | null
	ocxBin?: string | null
}

/** Pending spawn operation to be processed on session.idle */
export interface PendingSpawn {
	branch: string
	path: string
	sessionId: string
}

/** Pending delete operation to be processed on session.idle */
export interface PendingDelete {
	branch: string
	path: string
}

/**
 * Handle to a project's persisted worktree state.
 * Replaces the former `bun:sqlite` Database handle while keeping the same
 * CRUD surface. The handle is a value object: it only carries the file path.
 */
export interface StateStore {
	readonly filePath: string
}

// =============================================================================
// SCHEMAS (Boundary Validation)
// =============================================================================

const sessionSchema = z.object({
	id: z.string().min(1),
	branch: z.string().min(1),
	path: z.string().min(1),
	createdAt: z.string().min(1),
	launchMode: z.enum(["plain", "ocx"]).optional(),
	profile: z.string().nullable().optional(),
	ocxBin: z.string().nullable().optional(),
})

const pendingSpawnSchema = z.object({
	branch: z.string().min(1),
	path: z.string().min(1),
	sessionId: z.string().min(1),
})

const pendingDeleteSchema = z.object({
	branch: z.string().min(1),
	path: z.string().min(1),
})

const persistedStateSchema = z.object({
	sessions: z.array(sessionSchema).default([]),
	pendingSpawn: pendingSpawnSchema.optional(),
	pendingDelete: pendingDeleteSchema.optional(),
})

/** Validated on-disk state document. */
type PersistedState = z.infer<typeof persistedStateSchema>

// =============================================================================
// STATE FILE LOCATIONS
// =============================================================================

/**
 * Get the default base directory for worktree storage.
 * Location: ~/.local/share/opencode/worktree/
 */
function getWorktreeBaseDirectory(): string {
	return path.join(os.homedir(), ".local", "share", "opencode", "worktree")
}

/**
 * Get the worktree path for a given project and branch.
 *
 * @param projectRoot - Absolute path to the project root
 * @param branch - Branch name for the worktree
 * @param basePath - Optional custom base path (absolute). Defaults to ~/.local/share/opencode/worktree
 * @returns Absolute path to the worktree directory
 */
export async function getWorktreePath(
	projectRoot: string,
	branch: string,
	basePath?: string,
): Promise<string> {
	if (!branch || typeof branch !== "string") {
		throw new Error("branch is required")
	}
	const projectId = await getProjectId(projectRoot)
	return path.join(basePath ?? getWorktreeBaseDirectory(), projectId, branch)
}

/**
 * Get the state directory path.
 * Location: ~/.local/share/opencode/plugins/worktree/
 */
function getStateDirectory(): string {
	const home = os.homedir()
	return path.join(home, ".local", "share", "opencode", "plugins", "worktree")
}

/**
 * Get the full state file path for a project.
 * @param projectRoot - Absolute path to the project root
 */
async function getStateFilePath(projectRoot: string): Promise<string> {
	const projectId = await getProjectId(projectRoot)
	return path.join(getStateDirectory(), `${projectId}.json`)
}

// =============================================================================
// ATOMIC FILE STORE
// =============================================================================

/** Maximum time spent retrying a contended read-modify-write. */
const STATE_RETRY_TIMEOUT_MS = 1000

/** Delay between retry attempts. */
const STATE_RETRY_DELAY_MS = 25

/** Filesystem error codes that indicate transient contention. */
const RETRYABLE_STATE_ERROR_CODES = new Set(["EBUSY", "EPERM", "EACCES", "EEXIST"])

/** Maximum time spent waiting to acquire the cross-process state lock. */
const STATE_LOCK_TIMEOUT_MS = 2000

/** Delay between state-lock acquisition attempts. */
const STATE_LOCK_RETRY_DELAY_MS = 10

/** A lock older than this is considered abandoned by a crashed process. */
const STATE_LOCK_STALE_MS = 10_000

/**
 * Initialize the JSON state file for worktree state.
 * Creates the file (and schema) if it does not exist, and validates existing
 * content before returning the store handle.
 *
 * @param projectRoot - Absolute path to the project root
 * @returns Store handle to pass to the CRUD functions
 *
 * @example
 * ```ts
 * const store = await initStateDb("/home/user/my-project")
 * const sessions = getAllSessions(store)
 * ```
 */
export async function initStateDb(projectRoot: string): Promise<StateStore> {
	// Guard: validate project root
	if (!projectRoot || typeof projectRoot !== "string") {
		throw new Error("initStateDb requires a valid project root path")
	}

	const filePath = await getStateFilePath(projectRoot)
	mkdirSync(path.dirname(filePath), { recursive: true })

	const store: StateStore = { filePath }

	// Existing valid content needs no rewrite: rewriting on every boot would
	// widen the cross-process race for no benefit. Materialize the file only
	// when it is missing; invalid content fails fast inside readState.
	if (existsSync(filePath)) {
		readState(store)
		return store
	}

	updateState(store, (state) => state)

	return store
}

function readState(store: StateStore): PersistedState {
	let raw: string
	try {
		raw = readFileSync(store.filePath, "utf8")
	} catch (error) {
		// A missing file is the empty initial state, not an error.
		if (isErrnoCode(error, "ENOENT")) {
			return { sessions: [] }
		}
		throw error
	}

	if (!raw.trim()) {
		return { sessions: [] }
	}

	let parsedJson: unknown
	try {
		parsedJson = JSON.parse(raw)
	} catch (error) {
		throw new Error(
			`state: "${store.filePath}" is not valid JSON. Delete it to reset worktree tracking. (${describeError(error)})`,
		)
	}

	const result = persistedStateSchema.safeParse(parsedJson)
	if (!result.success) {
		throw new Error(
			`state: "${store.filePath}" has invalid worktree data: ${result.error.message}`,
		)
	}

	return result.data
}

function writeState(store: StateStore, state: PersistedState): void {
	const tempPath = `${store.filePath}.${process.pid}.${randomUUID()}.tmp`
	try {
		writeFileSync(tempPath, `${JSON.stringify(state, null, 2)}\n`, "utf8")
		renameSync(tempPath, store.filePath)
	} finally {
		// On success the rename already consumed the temp file (ENOENT here);
		// on failure this removes the orphaned temp file. Cleanup is best-effort.
		try {
			unlinkSync(tempPath)
		} catch {
			// Renamed away or never created - nothing left to clean up.
		}
	}
}

/**
 * Read, transform and atomically persist the state document.
 *
 * The whole read-modify-write cycle runs under a cross-process lockfile so
 * concurrent processes cannot lose each other's updates. Inside the lock,
 * transient filesystem contention (EBUSY/EPERM/EACCES) is retried briefly,
 * then the underlying cause is rethrown loudly.
 */
function updateState(
	store: StateStore,
	transform: (state: PersistedState) => PersistedState,
): void {
	const lockPath = stateLockPath(store)
	const lockFd = acquireStateLock(lockPath)

	try {
		const deadline = Date.now() + STATE_RETRY_TIMEOUT_MS

		for (;;) {
			try {
				const state = readState(store)
				writeState(store, transform(state))
				return
			} catch (error) {
				if (!isRetryableStateError(error) || Date.now() >= deadline) {
					throw error
				}
				sleepSync(STATE_RETRY_DELAY_MS)
			}
		}
	} finally {
		releaseStateLock(lockFd, lockPath)
	}
}

/** Path of the lockfile guarding a store's read-modify-write critical section. */
function stateLockPath(store: StateStore): string {
	return `${store.filePath}.lock`
}

/**
 * Acquire the state lockfile, waiting briefly for a concurrent writer.
 *
 * Uses `O_CREAT|O_EXCL` so exactly one process can hold the lock at a time. A
 * lock whose mtime is older than {@link STATE_LOCK_STALE_MS} is treated as
 * abandoned by a crashed process and reclaimed. Fails loudly on timeout.
 */
function acquireStateLock(lockPath: string): number {
	const deadline = Date.now() + STATE_LOCK_TIMEOUT_MS

	for (;;) {
		try {
			return openSync(lockPath, "wx")
		} catch (error) {
			if (!isErrnoCode(error, "EEXIST")) throw error

			if (isStaleStateLock(lockPath)) {
				reclaimStaleStateLock(lockPath)
				continue
			}

			if (Date.now() >= deadline) {
				throw new Error(
					`state: timed out after ${STATE_LOCK_TIMEOUT_MS}ms waiting for lock "${lockPath}" held by another process. Delete it if no writer is active.`,
				)
			}

			sleepSync(STATE_LOCK_RETRY_DELAY_MS)
		}
	}
}

/** Whether the lockfile exists and has not been touched for the stale window. */
function isStaleStateLock(lockPath: string): boolean {
	try {
		return Date.now() - statSync(lockPath).mtimeMs > STATE_LOCK_STALE_MS
	} catch (error) {
		// Vanished between the failed open and this stat: let the caller retry.
		if (isErrnoCode(error, "ENOENT")) return false
		throw error
	}
}

/**
 * Remove an abandoned lockfile. Re-checks staleness immediately before the
 * unlink to narrow the window where another process may have already reclaimed
 * it and created a fresh lock.
 */
function reclaimStaleStateLock(lockPath: string): void {
	if (!isStaleStateLock(lockPath)) return

	logWarn(undefined, "worktree", `Reclaiming stale state lock: ${lockPath}`)
	try {
		unlinkSync(lockPath)
	} catch (error) {
		// Another process reclaimed it first; that is fine.
		if (!isErrnoCode(error, "ENOENT")) throw error
	}
}

/** Release the lockfile. Best-effort; tolerates an already-removed lock. */
function releaseStateLock(lockFd: number, lockPath: string): void {
	try {
		closeSync(lockFd)
	} catch {
		// Descriptor already closed - nothing to do.
	}

	try {
		unlinkSync(lockPath)
	} catch (error) {
		if (!isErrnoCode(error, "ENOENT")) {
			logWarn(undefined, "worktree", `Failed to release state lock ${lockPath}: ${describeError(error)}`)
		}
	}
}

function isRetryableStateError(error: unknown): boolean {
	if (!isErrnoError(error)) return false
	return RETRYABLE_STATE_ERROR_CODES.has(error.code ?? "")
}

interface ErrnoError extends Error {
	code?: string
}

function isErrnoError(error: unknown): error is ErrnoError {
	return error instanceof Error && "code" in error
}

function isErrnoCode(error: unknown, code: string): boolean {
	return isErrnoError(error) && error.code === code
}

function describeError(error: unknown): string {
	return error instanceof Error ? error.message : String(error)
}

/**
 * Normalize a persisted session into a trusted {@link Session}, applying the
 * same legacy-launch-metadata defaults as the previous SQLite implementation.
 */
function normalizeSession(session: z.infer<typeof sessionSchema>): Session {
	const launchMetadata = parsePersistedLaunchMetadata({
		launchMode: session.launchMode,
		profile: session.profile,
		ocxBin: session.ocxBin,
	})
	const serialized = serializePersistedLaunchMetadata(launchMetadata)

	return {
		id: session.id,
		branch: session.branch,
		path: session.path,
		createdAt: session.createdAt,
		launchMode: serialized.launchMode,
		profile: serialized.profile,
		ocxBin: serialized.ocxBin,
	}
}

// =============================================================================
// SESSION CRUD
// =============================================================================

/**
 * Add a new session to the store.
 * Upserts by session id (last write wins).
 *
 * @param store - Store handle from initStateDb
 * @param session - Session data to persist
 */
export function addSession(store: StateStore, session: SessionInput): void {
	// Parse at boundary for type safety
	const parsed = sessionSchema.parse(session)
	const launchMetadata = parsePersistedLaunchMetadata({
		launchMode: parsed.launchMode,
		profile: parsed.profile,
		ocxBin: parsed.ocxBin,
	})
	const serializedLaunchMetadata = serializePersistedLaunchMetadata(launchMetadata)

	const nextSession: Session = {
		id: parsed.id,
		branch: parsed.branch,
		path: parsed.path,
		createdAt: parsed.createdAt,
		launchMode: serializedLaunchMetadata.launchMode,
		profile: serializedLaunchMetadata.profile,
		ocxBin: serializedLaunchMetadata.ocxBin,
	}

	updateState(store, (state) => ({
		...state,
		sessions: [...state.sessions.filter((existing) => existing.id !== nextSession.id), nextSession],
	}))
}

/**
 * Get a session by ID.
 *
 * @param store - Store handle from initStateDb
 * @param sessionId - Session ID to look up
 * @returns Session if found, null otherwise
 */
export function getSession(store: StateStore, sessionId: string): Session | null {
	// Guard: empty session ID
	if (!sessionId) return null

	const state = readState(store)
	const found = state.sessions.find((session) => session.id === sessionId)
	return found ? normalizeSession(found) : null
}

/**
 * Remove all sessions matching a branch name.
 *
 * @param store - Store handle from initStateDb
 * @param branch - Branch name to remove
 */
export function removeSession(store: StateStore, branch: string): void {
	// Guard: empty branch
	if (!branch) return

	updateState(store, (state) => {
		const remaining = state.sessions.filter((session) => session.branch !== branch)
		if (remaining.length === state.sessions.length) return state
		return { ...state, sessions: remaining }
	})
}

/**
 * Get all active sessions, ordered by creation time (ascending).
 *
 * @param store - Store handle from initStateDb
 * @returns Array of all sessions, empty if none
 */
export function getAllSessions(store: StateStore): Session[] {
	const state = readState(store)

	return state.sessions
		.map((session) => normalizeSession(session))
		.sort((left, right) => left.createdAt.localeCompare(right.createdAt))
}

// =============================================================================
// PENDING SPAWN OPERATIONS
// =============================================================================

/**
 * Set a pending spawn operation. Uses singleton pattern (last-write-wins).
 *
 * If a pending operation already exists, it will be REPLACED and a warning
 * logged. This is intentional: only the most recent request should be processed.
 *
 * @param store - Store handle from initStateDb
 * @param spawn - Spawn operation data
 */
export function setPendingSpawn(
	store: StateStore,
	spawn: PendingSpawn,
	client?: OpencodeClient,
): void {
	// Parse at boundary for type safety
	const parsed = pendingSpawnSchema.parse(spawn)

	// Check for existing operations and warn about replacement
	const existing = readState(store)
	if (existing.pendingSpawn) {
		logWarn(client, "worktree", `Replacing pending spawn: "${existing.pendingSpawn.branch}" → "${parsed.branch}"`)
	} else if (existing.pendingDelete) {
		logWarn(client, "worktree", `Pending spawn replacing pending delete for: "${existing.pendingDelete.branch}"`)
	}

	updateState(store, (state) => ({
		...state,
		pendingSpawn: parsed,
		pendingDelete: undefined,
	}))
}

/**
 * Get the pending spawn operation if one exists.
 *
 * @param store - Store handle from initStateDb
 * @returns PendingSpawn if exists, null otherwise
 */
export function getPendingSpawn(store: StateStore): PendingSpawn | null {
	return readState(store).pendingSpawn ?? null
}

/**
 * Clear any pending spawn operation, leaving a pending delete untouched.
 *
 * @param store - Store handle from initStateDb
 */
export function clearPendingSpawn(store: StateStore): void {
	updateState(store, (state) => {
		if (!state.pendingSpawn) return state
		const { pendingSpawn: _removed, ...rest } = state
		return rest
	})
}

// =============================================================================
// PENDING DELETE OPERATIONS
// =============================================================================

/**
 * Set a pending delete operation. Uses singleton pattern (last-write-wins).
 *
 * If a pending operation already exists, it will be REPLACED and a warning
 * logged. This is intentional: only the most recent request should be processed.
 *
 * @param store - Store handle from initStateDb
 * @param del - Delete operation data
 */
export function setPendingDelete(
	store: StateStore,
	del: PendingDelete,
	client?: OpencodeClient,
): void {
	// Parse at boundary for type safety
	const parsed = pendingDeleteSchema.parse(del)

	// Check for existing operations and warn about replacement
	const existing = readState(store)
	if (existing.pendingDelete) {
		logWarn(client, "worktree", `Replacing pending delete: "${existing.pendingDelete.branch}" → "${parsed.branch}"`)
	} else if (existing.pendingSpawn) {
		logWarn(client, "worktree", `Pending delete replacing pending spawn for: "${existing.pendingSpawn.branch}"`)
	}

	updateState(store, (state) => ({
		...state,
		pendingDelete: parsed,
		pendingSpawn: undefined,
	}))
}

/**
 * Get the pending delete operation if one exists.
 *
 * @param store - Store handle from initStateDb
 * @returns PendingDelete if exists, null otherwise
 */
export function getPendingDelete(store: StateStore): PendingDelete | null {
	return readState(store).pendingDelete ?? null
}

/**
 * Clear any pending delete operation, leaving a pending spawn untouched.
 *
 * @param store - Store handle from initStateDb
 */
export function clearPendingDelete(store: StateStore): void {
	updateState(store, (state) => {
		if (!state.pendingDelete) return state
		const { pendingDelete: _removed, ...rest } = state
		return rest
	})
}
