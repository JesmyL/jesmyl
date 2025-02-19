import { LazyIcon } from '#shared/ui/icon';
import { useEffect } from 'react';
import { useFullScreen } from '../../../shared/lib/+hooks/useFullscreen';
import { addEventListenerPipe, hookEffectPipe } from '../../../shared/lib/hookEffectPipe';

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
