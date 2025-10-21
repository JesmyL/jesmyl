import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';
import { atom, useAtom, useAtomSet, useAtomValue } from 'atomaric';

const listAtom = atom<BibleBroadcastSingleAddress[]>([]);
const selectediAtom = atom<number | null>(null);

export const useBibleBroadcastSearchSearchResultList = () => useAtom(listAtom);

export const useBibleBroadcastSearchResultSelectedValue = () => useAtomValue(selectediAtom);
export const useBibleBroadcastSearchResultSelectedSet = () => useAtomSet(selectediAtom);
