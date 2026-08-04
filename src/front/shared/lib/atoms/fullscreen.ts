import { atom } from 'atomaric';

const match = () => window.matchMedia('(display-mode:fullscreen)');
const checkIsFullscreen = () => !!document.fullscreenElement || match().matches;

export const isFullscreenAtom = atom(checkIsFullscreen());

export const switchFullScreen = async (set: boolean) => {
  isFullscreenAtom.set(set);

  if (!set || checkIsFullscreen()) await document.exitFullscreen();
  else await document.body.requestFullscreen({ navigationUI: 'hide' });
};

match().addEventListener('change', ({ matches }) => isFullscreenAtom.set(matches));
document.addEventListener('fullscreenchange', () => isFullscreenAtom.set(checkIsFullscreen()));
