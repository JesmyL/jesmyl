import { translateBase } from '#basis/locale';
import { addEventListenerPipe } from '#shared/lib/hookEffectPipe';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { atom, useAtomValue } from 'atomaric';
import { HttpNumLeadLink } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { retNull } from 'shared/utils';
import { toast } from 'sonner';
import { takeCmComAudioPlayerCachedBlob, takeCmComAudioPlayerTrackUrl } from '../lib/audioCache';

const audioElement = document.createElement('audio');

audioElement.preload = 'none';
audioElement.addEventListener('error', () =>
  toast(
    translateBase(BaseLocaleKey.CmAudioPlaybackError),
    makeToastKOMoodConfig(),
  ),
);

const comPlayerDurationAtom = atom(0.01);
const comPlayerCurrentTimeAtom = atom(0);

export const cmComAudioPlayerPlaySrcAtom = atom<HttpNumLeadLink | null>(null);
export const cmComAudioPlayerEndedTickAtom = atom(false);
export const cmComAudioPlayerErrorTickAtom = atom(false);
export const cmComAudioPlayerIsPlayAtom = atom(false);

/** Resolvable track title shown on the media session (lock screen); falls back to a title derived from the play src. */
export const cmComAudioPlayerMediaTitleAtom = atom<string | nil>(null);

export const useCmComAudioPlayerDuration = () => useAtomValue(comPlayerDurationAtom);
export const useCmComAudioPlayerCurrentTime = () => useAtomValue(comPlayerCurrentTimeAtom);

cmComAudioPlayerEndedTickAtom.subscribe(isEnd => {
  if (isEnd) setTimeout(cmComAudioPlayerEndedTickAtom.set, 0, false);
});

cmComAudioPlayerErrorTickAtom.subscribe(isEnd => {
  if (isEnd) setTimeout(cmComAudioPlayerErrorTickAtom.set, 0, false);
});

// audio listeners

audioElement.addEventListener('durationchange', () => {
  comPlayerDurationAtom.set(audioElement.duration);
});

audioElement.addEventListener('ended', () => {
  cmComAudioPlayerUpdateCurrentTime(0);
  cmComAudioPlayerIsPlayAtom.set(false);

  cmComAudioPlayerEndedTickAtom.set(true);
});

audioElement.addEventListener('error', () => {
  cmComAudioPlayerErrorTickAtom.set(true);
});

audioElement.addEventListener('timeupdate', () => {
  comPlayerCurrentTimeAtom.set(audioElement.currentTime);
});

// methods

/**
 * `timeupdate` only fires during playback and lags a seek by a task, so the atom would stay stale
 * (or never move while paused) unless a seek updates it synchronously too.
 */
export const cmComAudioPlayerUpdateCurrentTime = (time: number) => {
  audioElement.currentTime = time;
  comPlayerCurrentTimeAtom.set(time);
};
export const takeCmComAudioPlayerCurrentTime = () => audioElement.currentTime;
export const takeCmComAudioPlayerDuration = () => audioElement.duration;
export const takeCmComAudioPlayerPlaybackRate = () => audioElement.playbackRate;

export const cmComAudioPlayerUpdatePlaybackRate = (playbackRate: number) => {
  audioElement.playbackRate = playbackRate;
};

export const cmComAudioPlayerAddEventListenerPipe = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Listener extends typeof addEventListenerPipe<HTMLAudioElement, any, any>,
>(
  eventName: Parameters<Listener>[1],
  callback: Parameters<Listener>[2],
) => {
  return addEventListenerPipe(audioElement, eventName, callback);
};

export const cmComAudioPlayerGetSrc = () => cmComAudioPlayerPlaySrcAtom.get();
export const cmComAudioPlayerSetMediaTitle = (title: string | nil) => cmComAudioPlayerMediaTitleAtom.set(title);

let trackObjectUrl: string | nil = null;
let isCmComAudioPlayerSrcApplying = false;
/** Monotonic id of the latest `cmComAudioPlayerSetSrc` call; a slower in-flight apply with an older id must not win. */
let cmComAudioPlayerSrcApplyId = 0;

const revokeCmComAudioPlayerTrackUrl = () => {
  if (!trackObjectUrl) return;

  URL.revokeObjectURL(trackObjectUrl);
  trackObjectUrl = null;
};

/** Cache-first: a cached track plays from a local blob URL so it keeps working offline. */
const applyCmComAudioPlayerSrc = async (src: HttpNumLeadLink, applyId: number) => {
  const blob = await takeCmComAudioPlayerCachedBlob(src).catch(retNull);
  if (applyId !== cmComAudioPlayerSrcApplyId || cmComAudioPlayerPlaySrcAtom.get() !== src) return;

  revokeCmComAudioPlayerTrackUrl();

  if (blob?.size) {
    trackObjectUrl = URL.createObjectURL(blob);
    audioElement.src = trackObjectUrl;
  } else audioElement.src = takeCmComAudioPlayerTrackUrl(src);

  isCmComAudioPlayerSrcApplying = false;
  if (cmComAudioPlayerIsPlayAtom.get()) void audioElement.play().catch(() => cmComAudioPlayerIsPlayAtom.set(false));
};

export const cmComAudioPlayerSetSrc = (src: HttpNumLeadLink | null) => {
  if (cmComAudioPlayerPlaySrcAtom.get() === src) return;

  cmComAudioPlayerUpdateCurrentTime(0);
  cmComAudioPlayerSwitchIsPlay(false);
  cmComAudioPlayerPlaySrcAtom.set(src);
  cmComAudioPlayerSetMediaTitle(null);
  revokeCmComAudioPlayerTrackUrl();

  const applyId = ++cmComAudioPlayerSrcApplyId;

  if (src == null) {
    isCmComAudioPlayerSrcApplying = false;
    audioElement.removeAttribute('src');
    return;
  }

  isCmComAudioPlayerSrcApplying = true;
  void applyCmComAudioPlayerSrc(src, applyId);
};

export const cmComAudioPlayerSwitchIsPlay = (isPlay: boolean = audioElement.paused) => {
  if (audioElement.paused ? !isPlay : isPlay) return;

  cmComAudioPlayerIsPlayAtom.set(isPlay);

  if (!isPlay) {
    audioElement.pause();
    return;
  }

  if (isCmComAudioPlayerSrcApplying) return;

  audioElement.play().catch(() => cmComAudioPlayerIsPlayAtom.set(false));
};
