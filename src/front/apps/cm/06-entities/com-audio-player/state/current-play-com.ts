import { atom, useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';

export const cmComAudioPlayerHTMLElement = document.createElement('audio');

const comPlayerDurationAtom = atom(0.01);
const comPlayerCurrentTimeAtom = atom(0);

export const cmComAudioPlayerPlaySrcAtom = atom<HttpLink | null>(null);
export const cmComAudioPlayerEndedTickAtom = atom(false);
export const cmComAudioPlayerErrorTickAtom = atom(false);
export const cmComAudioPlayerIsPlayAtom = atom(false);
export const cmComAudioPlayerIsUserSlideTrackDTO = { isSlide: false };

export const useCmComAudioPlayerDuration = () => useAtomValue(comPlayerDurationAtom);
export const useCmComAudioPlayerCurrentTime = () => useAtomValue(comPlayerCurrentTimeAtom);

cmComAudioPlayerPlaySrcAtom.subscribe(src => {
  cmComAudioPlayerIsPlayAtom.set(false);
  cmComAudioPlayerHTMLElement.currentTime = 0;
  cmComAudioPlayerHTMLElement.src = src!;
});

cmComAudioPlayerIsPlayAtom.subscribe(isPlay => {
  if (isPlay) cmComAudioPlayerHTMLElement.play();
  else cmComAudioPlayerHTMLElement.pause();
});

cmComAudioPlayerEndedTickAtom.subscribe(isEnd => {
  if (isEnd) setTimeout(cmComAudioPlayerEndedTickAtom.set, 0, false);
});

cmComAudioPlayerErrorTickAtom.subscribe(isEnd => {
  if (isEnd) setTimeout(cmComAudioPlayerErrorTickAtom.set, 0, false);
});

// audio listeners

cmComAudioPlayerHTMLElement.addEventListener('durationchange', () => {
  comPlayerDurationAtom.set(cmComAudioPlayerHTMLElement.duration);
});

cmComAudioPlayerHTMLElement.addEventListener('ended', () => {
  comPlayerCurrentTimeAtom.set(0);
  cmComAudioPlayerIsPlayAtom.set(false);
  cmComAudioPlayerEndedTickAtom.set(true);
});

cmComAudioPlayerHTMLElement.addEventListener('error', () => {
  cmComAudioPlayerErrorTickAtom.set(true);
});

cmComAudioPlayerHTMLElement.addEventListener('timeupdate', () => {
  comPlayerCurrentTimeAtom.set(cmComAudioPlayerHTMLElement.currentTime);
});

cmComAudioPlayerHTMLElement.addEventListener('pause', () => {
  if (cmComAudioPlayerIsUserSlideTrackDTO.isSlide) return;
  cmComAudioPlayerIsPlayAtom.set(false);
});

cmComAudioPlayerHTMLElement.addEventListener('play', () => {
  if (cmComAudioPlayerIsUserSlideTrackDTO.isSlide) return;
  cmComAudioPlayerIsPlayAtom.set(true);
});
