import { useCallback } from 'react';
import { useToggleIsScreenTranslationTextVisible } from '../../+complect/translations/atoms';
import { useActualRef } from '../../../../shared/lib/+hooks/useActualRef';
import { atom, useAtomInkrement, useAtomValue } from '../../../../shared/lib/atom';
import { useBibleTranslationAddToHistory } from '../translations/archive/history/hooks/history';
import { useBibleTranslationJoinAddress } from './address/address';
import { useBibleAddressBooki } from './address/books';
import { useBibleAddressChapteri } from './address/chapters';
import { useBibleAddressVersei } from './address/verses';

const inkAtom = atom(0);

export const useBibleSlideSyncInkrementer = () => useAtomInkrement(inkAtom);
export const useBibleSlideSyncValue = () => useAtomValue(inkAtom);

export const useBibleTranslationSlideSyncContentSetter = () => {
  const currentBookiRef = useActualRef(useBibleAddressBooki());
  const currentChapteriRef = useActualRef(useBibleAddressChapteri());
  const currentVerseiRef = useActualRef(useBibleAddressVersei());
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
