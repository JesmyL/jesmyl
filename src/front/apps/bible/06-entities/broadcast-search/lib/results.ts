import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';
import { Atom, atom } from 'atomaric';

export const bibleBroadcastSearchResultSelectedListAtom: Atom<BibleBroadcastSingleAddress[]> = atom<
  BibleBroadcastSingleAddress[]
>([]);

export const bibleBroadcastSearchResultSelectedAtom = atom(0);
