import { useScreenBroadcastWindows } from '#features/broadcast/hooks/windows';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useCmBroadcastScreenComNavigations, useCmBroadcastScreenComTextNavigations } from '$cm/features/broadcast';
import { useEffect } from 'react';

const win = { win: window };

export const useCmBroadcastScreenKeyDownListen = () => {
  const windows = useScreenBroadcastWindows();
  const comActionsRef = useActualRef(useCmBroadcastScreenComNavigations());
  const comTextActionsRef = useActualRef(useCmBroadcastScreenComTextNavigations());

  useEffect(() => {
    const onKeyBroadcast = async (event: KeyboardEvent) => {
      switch (event.code) {
        case 'F5':
        case 'KeyR':
          if (!event.ctrlKey) return;
          // just prevent default + stop propagation
          break;
        case 'ArrowUp':
          if (!event.ctrlKey) return;
          comActionsRef.current.prevCom();
          break;

        case 'ArrowDown':
          if (!event.ctrlKey) return;
          comActionsRef.current.nextCom();
          break;

        case 'ArrowLeft':
          comTextActionsRef.current.prevText();
          break;

        case 'ArrowRight':
          comTextActionsRef.current.nextText();
          break;

        default:
          return;
      }

      event.preventDefault();
      event.stopPropagation();
    };

    const winsSet = new Set([windows, win].flat());
    winsSet.forEach(win => win?.win.addEventListener('keydown', onKeyBroadcast));

    return () => {
      winsSet.forEach(win => win?.win.removeEventListener('keydown', onKeyBroadcast));
    };
  }, [comActionsRef, comTextActionsRef, windows]);
};
