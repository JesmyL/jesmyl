import { bibleIDB } from '#basis/lib/idb/bible';

export const useBibleMyTranslates = () => bibleIDB.use.myTranslates();
export const useBibleShowTranslates = () => bibleIDB.use.showTranslates();
export const useBibleShowTranslatesValue = () => bibleIDB.useValue.showTranslates();
