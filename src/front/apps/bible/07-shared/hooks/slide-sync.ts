import { isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { bibleBroadcastHistoryAddToHistory } from '$bible/entities/broadcast-history';
import { atom, useAtomValue } from 'atomaric';
import { BibleBroadcastAnyAddress } from '../model/base';
import { bibleJoinAddressAtom } from '../state/atoms';
import { takeBibleSimpleCheckedSingleAddress } from './address/simple.address';

const showAddressCodeAtom = atom<BibleBroadcastAnyAddress | nil>(null);

export const biblePrintShowSlideAddressCode = () => {
  showAddressCodeAtom.set(bibleJoinAddressAtom.get()[0] ?? takeBibleSimpleCheckedSingleAddress(null, null, null, null));
};

export const useBibleShowSlideAddressCode = () => useAtomValue(showAddressCodeAtom);

export const bibleBroadcastSyncSlide = (isReplaceFirstNearVersei = false) => {
  isBroadcastTextVisibleAtom.set(true);

  requestAnimationFrame(() => {
    bibleBroadcastHistoryAddToHistory(
      bibleJoinAddressAtom.get()[0] ?? takeBibleSimpleCheckedSingleAddress(null, null, null, null),
      isReplaceFirstNearVersei,
    );
    biblePrintShowSlideAddressCode();
  });
};
