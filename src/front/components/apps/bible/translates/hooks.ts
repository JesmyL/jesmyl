import { bibleIDB } from '../shared/lib/bibleIDB';

export const useBibleMyTranslates = () => bibleIDB.use.myTranslates();
export const useBibleShowTranslates = () => bibleIDB.use.showTranslates();
export const useBibleShowTranslatesValue = () => bibleIDB.useValue.showTranslates();
