import { makeRegExp } from 'regexpert';
import { lazyInit } from 'shared/utils/lazyInit';
import {
  cmComAudioPlayerAddEventListenerPipe,
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerMediaTitleAtom,
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSwitchIsPlay,
  takeCmComAudioPlayerCurrentTime,
  takeCmComAudioPlayerDuration,
  takeCmComAudioPlayerPlaybackRate,
} from '../state/current-play-com';
import { cmComAudioPlayerGoToAdjacentCom } from './adjacent-coms';

/** Trailing file extension: a dot plus up to five alphanumerics, e.g. `.mp3`. */
const fileExtensionLazy = lazyInit(() => makeRegExp('/\\.[a-z0-9]{1,5}$/i'));
/** Storage prefix of a numLead src (`9~`), never part of a track name. */
const srcNumLeadLazy = lazyInit(() => makeRegExp('/^\\d+~/'));

/** Parses an audio src against the current origin, yielding null for malformed input. */
const parseSrc = (src: string) => {
  try {
    return new URL(src, location.origin);
  } catch {
    return null;
  }
};

/**
 * Human-readable track title derived from an audio src, used on the lock screen where no com
 * context is set. Falls back to '' when the src carries no usable file name.
 */
const titleFromSrc = (src: string | nil) => {
  const pathname = src ? parseSrc(src)?.pathname : null;
  if (!pathname) return '';

  const encodedName = pathname.slice(pathname.lastIndexOf('/') + 1);
  if (!encodedName) return '';

  let name = encodedName;
  try {
    name = decodeURIComponent(encodedName);
  } catch {
    // Malformed percent-encoding: keep the raw segment.
  }

  return name.replace(fileExtensionLazy(), '').replace(srcNumLeadLazy(), '');
};

/**
 * Media Session bridge: mirrors the shared audio element to the OS / lock-screen
 * controls. Safely no-ops where the Media Session API is not supported.
 */
const mediaSession = navigator.mediaSession;

if (mediaSession) {
  const updateMetadata = () => {
    const title = cmComAudioPlayerMediaTitleAtom.get() ?? titleFromSrc(cmComAudioPlayerPlaySrcAtom.get());

    mediaSession.metadata = new MediaMetadata({ title, artist: 'JesmyL' });
  };

  const updatePositionState = () => {
    const duration = takeCmComAudioPlayerDuration();
    if (!Number.isFinite(duration) || duration <= 0) return;

    mediaSession.setPositionState({
      duration,
      playbackRate: takeCmComAudioPlayerPlaybackRate(),
      position: Math.min(takeCmComAudioPlayerCurrentTime(), duration),
    });
  };

  mediaSession.setActionHandler('play', () => cmComAudioPlayerSwitchIsPlay(true));
  mediaSession.setActionHandler('pause', () => cmComAudioPlayerSwitchIsPlay(false));
  mediaSession.setActionHandler('previoustrack', () => void cmComAudioPlayerGoToAdjacentCom('prev'));
  mediaSession.setActionHandler('nexttrack', () => void cmComAudioPlayerGoToAdjacentCom('next'));

  cmComAudioPlayerPlaySrcAtom.subscribe(updateMetadata);
  cmComAudioPlayerMediaTitleAtom.subscribe(updateMetadata);
  cmComAudioPlayerIsPlayAtom.subscribe(isPlay => {
    mediaSession.playbackState = isPlay ? 'playing' : 'paused';
  });
  cmComAudioPlayerAddEventListenerPipe('durationchange', updatePositionState);
  cmComAudioPlayerAddEventListenerPipe('timeupdate', updatePositionState);

  updateMetadata();
}
