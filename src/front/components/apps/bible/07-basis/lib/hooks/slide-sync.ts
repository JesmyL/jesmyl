import { atom, useAtomValue } from '#shared/lib/atom';
import { bibleIDB } from '$bible/basis/lib/bibleIDB';
import { BibleTranslationAnyAddress } from '$bible/basis/model/base';
import { useBibleTranslationAddToHistory } from '$bible/translations/archive/history/hooks/history';
import { useCallback } from 'react';
import { useSetIsScreenTranslationTextVisible } from '../../../../+complect/translations/atoms';

const showAddressCodeAtom = atom<BibleTranslationAnyAddress | nil>(null);

export const useBiblePrintShowSlideAddressCode = () =>
  useCallback(async () => {
    showAddressCodeAtom.set(
      (await bibleIDB.get.joinAddress()) ?? [
        await bibleIDB.get.booki(),
        await bibleIDB.get.chapteri(),
        await bibleIDB.get.versei(),
      ],
    );
  }, []);

export const useBibleShowSlideAddressCode = () => useAtomValue(showAddressCodeAtom);

export const useBibleTranslationSlideSyncContentSetter = () => {
  const addToHistory = useBibleTranslationAddToHistory();
  const setIsVisible = useSetIsScreenTranslationTextVisible();
  const printShowAddress = useBiblePrintShowSlideAddressCode();

  return useCallback(
    (isReplaceFirstNearVersei = false) => {
      setIsVisible(true);

      setTimeout(async () => {
        addToHistory(
          (await bibleIDB.get.joinAddress()) ?? [
            await bibleIDB.get.booki(),
            await bibleIDB.get.chapteri(),
            await bibleIDB.get.versei(),
          ],
          isReplaceFirstNearVersei,
        );
        printShowAddress();
      });
    },
    [addToHistory, printShowAddress, setIsVisible],
  );
};
