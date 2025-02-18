import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useEffect } from 'react';
import { addEventListenerPipe, hookEffectPipe } from '../hookEffectPipe';
import { useFullScreen } from '../hooks/useFullscreen';

export const useGlobalFullscreenChanger = () => {
  const [isFullscreen, switchFullscreen] = useFullScreen();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'keydown', event => {
          if (event.code === 'Escape') switchFullscreen(false);
        }),
      )
      .effect();
  }, [switchFullscreen]);

  return [
    isFullscreen,
    <LazyIcon
      icon="ArrowShrink02"
      className="collapse-fullscreen-button pointer"
      onClick={() => switchFullscreen(false)}
    />,
  ] as const;
};
