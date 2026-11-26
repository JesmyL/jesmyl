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

/** Marks the last failed manual download attempt of a track; absence means no error — cached/not-cached is the cached-srcs atom's job. */
export const enum CmComAudioPlayerSrcState {
  Error,
}
