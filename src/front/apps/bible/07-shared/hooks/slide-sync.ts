import { useBibleBroadcastHistoryAddToHistory } from '$bible/entities/broadcast-history';
import { atom, useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { useSetIsScreenBroadcastTextVisible } from '../../../../features/broadcast/atoms';
import { BibleBroadcastAnyAddress } from '../model/base';
import { bibleBookiAtom, bibleChapteriAtom, bibleJoinAddressAtom, bibleVerseiAtom } from '../state/atoms';

const showAddressCodeAtom = atom<BibleBroadcastAnyAddress | nil>(null);

export const useBiblePrintShowSlideAddressCode = () =>
  useCallback(() => {
    showAddressCodeAtom.set(
      bibleJoinAddressAtom.get() ?? [bibleBookiAtom.get(), bibleChapteriAtom.get(), bibleVerseiAtom.get()],
    );
  }, []);

export const useBibleShowSlideAddressCode = () => useAtomValue(showAddressCodeAtom);

export const useBibleBroadcastSlideSyncContentSetter = () => {
  const addToHistory = useBibleBroadcastHistoryAddToHistory();
  const setIsVisible = useSetIsScreenBroadcastTextVisible();
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
