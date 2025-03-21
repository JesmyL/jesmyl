import { atom, useAtomValue } from '#shared/lib/atoms';
import { bibleIDB } from '$bible/basis/lib/bibleIDB';
import { BibleTranslationAnyAddress } from '$bible/basis/model/base';
import { useBibleTranslationAddToHistory } from '$bible/translations/archive/history/hooks/history';
import { useCallback } from 'react';
import { useToggleIsScreenTranslationTextVisible } from '../../../../+complect/translations/atoms';

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
  const switchIsVisible = useToggleIsScreenTranslationTextVisible();
  const printShowAddress = useBiblePrintShowSlideAddressCode();

  return useCallback(
    (isReplaceFirstNearVersei = false) => {
      switchIsVisible(true);

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
    [addToHistory, printShowAddress, switchIsVisible],
  );
};
