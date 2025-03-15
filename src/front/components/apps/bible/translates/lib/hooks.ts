import { bibleIDB } from '$bible/_db/bibleIDB';

export const useBibleMyTranslates = () => bibleIDB.use.myTranslates();
export const useBibleShowTranslates = () => bibleIDB.use.showTranslates();
export const useBibleShowTranslatesValue = () => bibleIDB.useValue.showTranslates();
