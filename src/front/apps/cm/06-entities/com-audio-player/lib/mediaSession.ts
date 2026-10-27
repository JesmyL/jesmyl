import { cmComFavouriteToggle } from '$cm/entities/com-favourite';
import { retNull } from 'shared/utils';
import {
  cmComAudioPlayerAddEventListenerPipe,
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSwitchIsPlay,
  takeCmComAudioPlayerCurrentTime,
  takeCmComAudioPlayerDuration,
  takeCmComAudioPlayerPlaybackRate,
} from '../state/current-play-com';
import { CmComAudioPlayerAdjacentDirection } from '../model';
import { cmComAudioPlayerGoToAdjacentCom, takeCmComAudioPlayerPlayedComw } from './adjacent-coms';

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

  mediaSession.setActionHandler('play', () => {
    if (cmComAudioPlayerPlaySrcAtom.get() == null) return;

    cmComAudioPlayerSwitchIsPlay(true);
  });
  mediaSession.setActionHandler('pause', () => cmComAudioPlayerSwitchIsPlay(false));
  mediaSession.setActionHandler('previoustrack', () =>
    void cmComAudioPlayerGoToAdjacentCom(CmComAudioPlayerAdjacentDirection.Prev).catch(retNull),
  );
  mediaSession.setActionHandler('nexttrack', () =>
    void cmComAudioPlayerGoToAdjacentCom(CmComAudioPlayerAdjacentDirection.Next).catch(retNull),
  );

  try {
    mediaSession.setActionHandler('like', () => {
      if (cmComAudioPlayerPlaySrcAtom.get() == null) return;

      void takeCmComAudioPlayerPlayedComw()
        .then(comw => {
          if (comw != null) cmComFavouriteToggle(comw);
        })
        .catch(retNull);
    });
  } catch {
    /** The like button is not supported everywhere; it simply stays absent from the lock screen. */
  }

  /** Android Chrome shows ±10s seek buttons instead of prev/next unless those actions are explicitly cleared. */
  try {
    mediaSession.setActionHandler('seekbackward', null);
    mediaSession.setActionHandler('seekforward', null);
  } catch {
    /** Seek actions are unsupported here, so there is nothing to clear. */
  }

  cmComAudioPlayerIsPlayAtom.subscribe(isPlay => {
    mediaSession.playbackState = isPlay ? 'playing' : 'paused';
  });
  cmComAudioPlayerAddEventListenerPipe('durationchange', updatePositionState);
  cmComAudioPlayerAddEventListenerPipe('timeupdate', updatePositionState);
}
