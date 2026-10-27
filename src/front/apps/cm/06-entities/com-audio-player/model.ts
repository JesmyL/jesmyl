/** Direction of the player's previous/next controls and lock-screen track actions. */
export const enum CmComAudioPlayerAdjacentDirection {
  Prev,
  Next,
}

/** How the current src was chosen: a manual pick is never auto-skipped on error. */
export const enum CmComAudioPlayerPickKind {
  Manual,
  Advance,
}

/** Per-track cache state: `Cached` plays from storage; `Error` marks the last failed attempt. */
export const enum CmComAudioPlayerSrcState {
  Cached,
  Error,
}

/** Aggregated cache state of a com's tracks, for the bulk cache tool. */
export const enum CmComAudioPlayerCacheState {
  None,
  Some,
  All,
}
