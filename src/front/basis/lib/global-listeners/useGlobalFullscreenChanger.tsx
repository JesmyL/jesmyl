import { useAtom } from '#shared/lib/atom';
import { isFullscreenAtom } from '#shared/lib/atoms/fullscreen';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useEffect } from 'react';

export const useGlobalFullscreenChanger = () => {
  const [isFullscreen, switchFullscreen] = useAtom(isFullscreenAtom);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'fullscreenchange', () => {
          switchFullscreen(!!document.fullscreenElement);
        }),
      )
      .effect();
  }, [switchFullscreen]);

  return [
    isFullscreen,
    isFullscreen && (
      <LazyIcon
        icon="ArrowShrink02"
        className="pointer absolute top-0 right-0 z-50 m-[10px]"
        onClick={() => switchFullscreen(false)}
      />
    ),
  ] as const;
};
