import { BibleSingleAddressCode } from '$bible/shared/model/base';
import { atom } from 'atomaric';

export const bibleBroadcastSearchResultSelectedListAtom = atom<BibleSingleAddressCode[]>([]);

export const bibleBroadcastSearchResultSelectedAtom = atom(0);
