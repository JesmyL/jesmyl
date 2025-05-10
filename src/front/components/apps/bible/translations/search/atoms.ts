import { BibleSearchZone } from '$bible/basis/model/base';
import { atom } from 'atomaric';

export const bibleSearchTermAtom = atom('', 'bible:searchTerm');
export const bibleSearchZoneAtom = atom<BibleSearchZone>('global', 'bible:searchZone');
