import { useScreenTranslationWindows } from '#features/translations/lib/hooks/windows';
import { useEffect } from 'react';
import { useActualRef } from '../../../../../../../../shared/lib/+hooks/useActualRef';
import { useCmScreenTranslationComNavigations } from '../../../hooks/com-navigation';
import { useCmScreenTranslationComTextNavigations } from '../../../hooks/com-texts';

const win = { win: window };

export const useScreenKeyDownListen = () => {
  const windows = useScreenTranslationWindows();
  const comActionsRef = useActualRef(useCmScreenTranslationComNavigations());
  const comTextActionsRef = useActualRef(useCmScreenTranslationComTextNavigations());

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
