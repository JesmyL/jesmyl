import { isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { bibleBroadcastHistoryAddToHistory } from '$bible/entities/broadcast-history';
import { atom, useAtomValue } from 'atomaric';
import { BibleBroadcastAnyAddress } from '../model/base';
import { bibleBookiAtom, bibleChapteriAtom, bibleJoinAddressAtom, bibleVerseiAtom } from '../state/atoms';

const showAddressCodeAtom = atom<BibleBroadcastAnyAddress | nil>(null);

export const biblePrintShowSlideAddressCode = () =>
  showAddressCodeAtom.set(
    bibleJoinAddressAtom.get()[0] ?? [bibleBookiAtom.get(), bibleChapteriAtom.get(), bibleVerseiAtom.get()],
  );

export const useBibleShowSlideAddressCode = () => useAtomValue(showAddressCodeAtom);

export const bibleBroadcastSyncSlide = (isReplaceFirstNearVersei = false) => {
  isBroadcastTextVisibleAtom.set(true);

  setTimeout(() => {
    bibleBroadcastHistoryAddToHistory(
      bibleJoinAddressAtom.get()[0] ?? [bibleBookiAtom.get(), bibleChapteriAtom.get(), bibleVerseiAtom.get()],
      isReplaceFirstNearVersei,
    );
    biblePrintShowSlideAddressCode();
  });
};
