import {
  cmComAudioPlayerAddEventListenerPipe,
  cmComAudioPlayerIsPlayAtom,
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
const mediaSession = navigator.mediaSession;

if (mediaSession) {
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

  cmComAudioPlayerIsPlayAtom.subscribe(isPlay => {
    mediaSession.playbackState = isPlay ? 'playing' : 'paused';
  });
  cmComAudioPlayerAddEventListenerPipe('durationchange', updatePositionState);
  cmComAudioPlayerAddEventListenerPipe('timeupdate', updatePositionState);
}
