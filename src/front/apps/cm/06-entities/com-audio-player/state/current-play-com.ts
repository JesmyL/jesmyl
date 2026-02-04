import { addEventListenerPipe } from '#shared/lib/hookEffectPipe';
import { atom, useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';

const audioElement = document.createElement('audio');

const comPlayerDurationAtom = atom(0.01);
const comPlayerCurrentTimeAtom = atom(0);

export const cmComAudioPlayerPlaySrcAtom = atom<HttpLink | null>(null);
export const cmComAudioPlayerEndedTickAtom = atom(false);
export const cmComAudioPlayerErrorTickAtom = atom(false);
export const cmComAudioPlayerIsPlayAtom = atom(false);

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

export const cmComAudioPlayerUpdateCurrentTime = (time: number) => (audioElement.currentTime = time);
export const takeCmComAudioPlayerCurrentTime = () => audioElement.currentTime;

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
export const cmComAudioPlayerSetSrc = (src: HttpLink | null) => {
  if (cmComAudioPlayerPlaySrcAtom.get() === src) return;

  cmComAudioPlayerUpdateCurrentTime(0);
  cmComAudioPlayerSwitchIsPlay(false);
  audioElement.src = src!;

  setTimeout(cmComAudioPlayerPlaySrcAtom.set, 0, src);
};

export const cmComAudioPlayerSwitchIsPlay = (isPlay: boolean = audioElement.paused) => {
  if (audioElement.paused ? !isPlay : isPlay) return;

  cmComAudioPlayerIsPlayAtom.set(isPlay);

  if (isPlay) audioElement.play();
  else audioElement.pause();
};
