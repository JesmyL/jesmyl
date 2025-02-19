import { atom, useAtom } from '../atom';

const isFullscreenAtom = atom(false);

isFullscreenAtom.onValueChange = isFullscreen => {
  if (isFullscreen) document.body.requestFullscreen();
  else if (document.fullscreenElement) document.exitFullscreen();
};

export const useFullScreen = () => useAtom(isFullscreenAtom);
