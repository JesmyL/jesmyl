import { useBibleBroadcastHistoryAddToHistory } from '$bible/entities/broadcast-history';
import { atom, useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { useSetIsScreenTranslationTextVisible } from '../../../../features/broadcast/atoms';
import { BibleTranslationAnyAddress } from '../model/base';
import { bibleBookiAtom, bibleChapteriAtom, bibleJoinAddressAtom, bibleVerseiAtom } from '../state/atoms';

const showAddressCodeAtom = atom<BibleTranslationAnyAddress | nil>(null);

export const useBiblePrintShowSlideAddressCode = () =>
  useCallback(() => {
    showAddressCodeAtom.set(
      bibleJoinAddressAtom.get() ?? [bibleBookiAtom.get(), bibleChapteriAtom.get(), bibleVerseiAtom.get()],
    );
  }, []);

export const useBibleShowSlideAddressCode = () => useAtomValue(showAddressCodeAtom);

export const useBibleTranslationSlideSyncContentSetter = () => {
  const addToHistory = useBibleBroadcastHistoryAddToHistory();
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
