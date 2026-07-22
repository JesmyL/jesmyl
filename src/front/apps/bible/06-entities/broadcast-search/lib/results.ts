import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';
import { Atom, atom, useAtomValue } from 'atomaric';

export const bibleBroadcastSearchResultSelectedListAtom: Atom<BibleBroadcastSingleAddress[]> = atom<
  BibleBroadcastSingleAddress[]
>([]);

export const bibleBroadcastSearchResultSelectedAtom = atom<number | null>(null);

export const useBibleBroadcastSearchResultSelectedValue = () => useAtomValue(bibleBroadcastSearchResultSelectedAtom);
