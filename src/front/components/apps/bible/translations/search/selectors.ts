import { bibleIDB } from '../../_db/bibleIDB';

export const useBibleSearchZone = () => bibleIDB.use.searchZone();
export const useBibleSearchTerm = () => bibleIDB.use.searchTerm();
export const useBibleAddressTerm = () => bibleIDB.use.addressTerm();
