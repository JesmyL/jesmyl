import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';
import { Atom, atom, useAtom, useAtomSet, useAtomValue } from 'atomaric';

let listAtom: Atom<BibleBroadcastSingleAddress[]>;
const selectediAtom = atom<number | null>(null);

export const useBibleBroadcastSearchSearchResultList = () =>
  useAtom((listAtom ??= atom<BibleBroadcastSingleAddress[]>([])));

export const useBibleBroadcastSearchResultSelectedValue = () => useAtomValue(selectediAtom);
export const useBibleBroadcastSearchResultSelectedSet = () => useAtomSet(selectediAtom);
