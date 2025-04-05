import { atom } from '../atom';

export const isFullscreenAtom = atom(false);

isFullscreenAtom.subscribe(isFullscreen => {
  if (isFullscreen) document.body.requestFullscreen();
  else if (document.fullscreenElement) document.exitFullscreen();
});
