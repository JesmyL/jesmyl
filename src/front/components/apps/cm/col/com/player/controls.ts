import { atom, useAtomValue } from '#shared/lib/atom';

export const comPlayerAudioElement = document.createElement('audio');

const comPlayerDurationAtom = atom(0.01);
const comPlayerCurrentTimeAtom = atom(0);

export const comPlayerPlaySrcAtom = atom<string | null>(null);
export const comPlayerIsPlayAtom = atom(false);
export const isUserSlideTrackDTO = { isSlide: false };

export const useComPlayerDuration = () => useAtomValue(comPlayerDurationAtom);
export const useComPlayerCurrentTime = () => useAtomValue(comPlayerCurrentTimeAtom);

comPlayerPlaySrcAtom.subscribe(src => {
  comPlayerIsPlayAtom.set(false);
  comPlayerAudioElement.currentTime = 0;
  comPlayerAudioElement.src = src!;
});

comPlayerIsPlayAtom.subscribe(isPlay => {
  if (isPlay) comPlayerAudioElement.play();
  else comPlayerAudioElement.pause();
});

comPlayerAudioElement.addEventListener('durationchange', () => {
  comPlayerDurationAtom.set(comPlayerAudioElement.duration);
});

comPlayerAudioElement.addEventListener('timeupdate', () => {
  comPlayerCurrentTimeAtom.set(comPlayerAudioElement.currentTime);

  if (comPlayerAudioElement.duration > -1 && comPlayerAudioElement.currentTime >= comPlayerAudioElement.duration) {
    comPlayerIsPlayAtom.set(false);
  }
});

comPlayerAudioElement.addEventListener('pause', () => {
  if (isUserSlideTrackDTO.isSlide) return;
  comPlayerIsPlayAtom.set(false);
});

comPlayerAudioElement.addEventListener('play', () => {
  if (isUserSlideTrackDTO.isSlide) return;
  comPlayerIsPlayAtom.set(true);
});
