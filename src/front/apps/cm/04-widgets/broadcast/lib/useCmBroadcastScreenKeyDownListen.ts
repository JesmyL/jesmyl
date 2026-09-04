import { useBroadcastListeners } from '#features/broadcast/complect/config-line/hooks/listeners';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useCmBroadcastScreenComNavigations, useCmBroadcastSlidesContext } from '$cm/features/broadcast';
import { useEffect } from 'react';

export const useCmBroadcastScreenKeyDownListen = (win: Window, configi: number) => {
  useBroadcastListeners(win, configi);

  const comActionsRef = useActualRef(useCmBroadcastScreenComNavigations());
  const comTextActionsRef = useActualRef(useCmBroadcastSlidesContext());

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'keydown', async event => {
          switch (event.code) {
            case 'ArrowUp':
              if (!event.ctrlKey) return;
              comActionsRef.current.prevCom();
              break;

            case 'ArrowDown':
              if (!event.ctrlKey) return;
              comActionsRef.current.nextCom();
              break;

            case 'ArrowLeft':
              comTextActionsRef.current.toSlide(-1);
              break;

            case 'ArrowRight':
              comTextActionsRef.current.toSlide(1);
              break;

            default:
              return;
          }

          event.preventDefault();
          event.stopPropagation();
        }),
      )
      .effect();
  }, [comActionsRef, comTextActionsRef, win]);
};
