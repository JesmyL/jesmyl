import { atom, useAtomValue } from '#shared/lib/atom';

export const comPlayerAudioElement = document.createElement('audio');

const comPlayerDurationAtom = atom(0);
const comPlayerCurrentTimeAtom = atom(0);

export const comPlayerPlaySrcAtom = atom<string | null>(null);
export const comPlayerIsPlayAtom = atom(false);
export const isUserSlideTrackDTO = { isSlide: false };

export const useComPlayerDuration = () => useAtomValue(comPlayerDurationAtom);
export const useComPlayerCurrentTime = () => useAtomValue(comPlayerCurrentTimeAtom);

comPlayerPlaySrcAtom.onValueChange = src => {
  comPlayerIsPlayAtom.set(false);
  comPlayerAudioElement.currentTime = 0;
  comPlayerAudioElement.src = src!;
};

comPlayerIsPlayAtom.onValueChange = isPlay => {
  if (isPlay) comPlayerAudioElement.play();
  else comPlayerAudioElement.pause();
};

comPlayerAudioElement.ondurationchange = () => {
  comPlayerDurationAtom.set(comPlayerAudioElement.duration);
};

comPlayerAudioElement.ontimeupdate = () => {
  comPlayerCurrentTimeAtom.set(comPlayerAudioElement.currentTime);

  if (comPlayerAudioElement.duration > -1 && comPlayerAudioElement.currentTime >= comPlayerAudioElement.duration) {
    comPlayerIsPlayAtom.set(false);
  }
};

comPlayerAudioElement.onpause = () => {
  if (isUserSlideTrackDTO.isSlide) return;
  comPlayerIsPlayAtom.set(false);
};

comPlayerAudioElement.onplay = () => {
  if (isUserSlideTrackDTO.isSlide) return;
  comPlayerIsPlayAtom.set(true);
};
