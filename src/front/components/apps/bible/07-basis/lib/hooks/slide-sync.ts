import { BibleTranslationAnyAddress } from '$bible/basis/model/base';
import { useBibleTranslationAddToHistory } from '$bible/translations/archive/history/hooks/history';
import { atom, useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { useSetIsScreenTranslationTextVisible } from '../../../../../../features/translations/atoms';
import { bibleBookiAtom, bibleChapteriAtom, bibleJoinAddressAtom, bibleVerseiAtom } from '../store/atoms';

const showAddressCodeAtom = atom<BibleTranslationAnyAddress | nil>(null);

export const useBiblePrintShowSlideAddressCode = () =>
  useCallback(() => {
    showAddressCodeAtom.set(
      bibleJoinAddressAtom.get() ?? [bibleBookiAtom.get(), bibleChapteriAtom.get(), bibleVerseiAtom.get()],
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

      setTimeout(() => {
        addToHistory(
          bibleJoinAddressAtom.get() ?? [bibleBookiAtom.get(), bibleChapteriAtom.get(), bibleVerseiAtom.get()],
          isReplaceFirstNearVersei,
        );
        printShowAddress();
      });
    },
    [addToHistory, printShowAddress, setIsVisible],
  );
};
