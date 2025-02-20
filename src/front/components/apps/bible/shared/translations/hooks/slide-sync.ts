import { useToggleIsScreenTranslationTextVisible } from '#features/translations/lib/atoms';
import { useActualRef } from '#shared/lib/+hooks/useActualRef';
import { atom, useAtomInkrement, useAtomValue } from '#shared/lib/atom';
import { useCallback } from 'react';
import { useBibleTranslationAddToHistory } from '../../../translations/archive/history/hooks/history';
import { useBibleTranslationJoinAddress } from './address';
import { useBibleCurrentBooki } from './books';
import { useBibleCurrentChapteri } from './chapters';
import { useBibleCurrentVersei } from './verses';

const inkAtom = atom(0);

export const useBibleSlideSyncInkrementer = () => useAtomInkrement(inkAtom);
export const useBibleSlideSyncValue = () => useAtomValue(inkAtom);

export const useBibleTranslationSlideSyncContentSetter = () => {
  const currentBookiRef = useActualRef(useBibleCurrentBooki());
  const currentChapteriRef = useActualRef(useBibleCurrentChapteri());
  const currentVerseiRef = useActualRef(useBibleCurrentVersei());
  const currentJoinAddress = useBibleTranslationJoinAddress();
  const addToHistory = useBibleTranslationAddToHistory();
  const switchIsVisible = useToggleIsScreenTranslationTextVisible();
  const inkSync = useBibleSlideSyncInkrementer();

  return useCallback(
    (isReplaceFirstNearVersei = false) => {
      inkSync(1);
      switchIsVisible(true);

      setTimeout(() => {
        addToHistory(
          currentJoinAddress ?? [currentBookiRef.current, currentChapteriRef.current, currentVerseiRef.current],
          isReplaceFirstNearVersei,
        );
      });
    },
    [addToHistory, currentBookiRef, currentChapteriRef, currentJoinAddress, currentVerseiRef, inkSync, switchIsVisible],
  );
};
