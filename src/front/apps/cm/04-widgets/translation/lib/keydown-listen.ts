import { useScreenTranslationWindows } from '#features/translations/hooks/windows';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import {
  useCmTranslationScreenComNavigations,
  useCmTranslationScreenComTextNavigations,
} from '$cm/features/translation';
import { useEffect } from 'react';

const win = { win: window };

export const useCmTranslationScreenKeyDownListen = () => {
  const windows = useScreenTranslationWindows();
  const comActionsRef = useActualRef(useCmTranslationScreenComNavigations());
  const comTextActionsRef = useActualRef(useCmTranslationScreenComTextNavigations());

  useEffect(() => {
    const onKeyTranslations = async (event: KeyboardEvent) => {
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
    winsSet.forEach(win => win?.win.addEventListener('keydown', onKeyTranslations));

    return () => {
      winsSet.forEach(win => win?.win.removeEventListener('keydown', onKeyTranslations));
    };
  }, [comActionsRef, comTextActionsRef, windows]);
};
