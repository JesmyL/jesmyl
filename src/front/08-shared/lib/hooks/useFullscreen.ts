import { atom, useAtom } from 'front/08-shared/lib/atoms';

const isFullscreenAtom = atom(false);

isFullscreenAtom.onValueChange = isFullscreen => {
  if (isFullscreen) document.body.requestFullscreen();
  else if (document.fullscreenElement) document.exitFullscreen();
};

export const useFullScreen = () => useAtom(isFullscreenAtom);
