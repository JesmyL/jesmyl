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

/**
 * Media Session bridge: mirrors the shared audio element to the OS / lock-screen
 * controls. Safely no-ops where the Media Session API is not supported.
 */
const mediaSession = 'mediaSession' in navigator ? navigator.mediaSession : undefined;

if (mediaSession) {
  const updateMetadata = () => {
    const title = cmComAudioPlayerMediaTitleAtom.get() ?? cmComAudioPlayerPlaySrcAtom.get() ?? '';

    mediaSession.metadata = new MediaMetadata({ title, artist: 'CM' });
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
