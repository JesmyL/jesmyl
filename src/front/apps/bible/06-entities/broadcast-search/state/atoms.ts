import { BibleSearchZone } from '$bible/shared/model/base';
import { atom } from 'atomaric';

export const bibleBroadcastSearchTermAtom = atom('', 'bible:searchTerm');
export const bibleBroadcastSearchZoneAtom = atom<BibleSearchZone>('global', 'bible:searchZone');
