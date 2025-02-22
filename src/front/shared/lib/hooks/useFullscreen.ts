import { atom, useAtom } from '../atoms';

const isFullscreenAtom = atom(false);

isFullscreenAtom.onValueChange = isFullscreen => {
  if (isFullscreen) document.body.requestFullscreen();
  else if (document.fullscreenElement) document.exitFullscreen();
};

export const useFullScreen = () => useAtom(isFullscreenAtom);
