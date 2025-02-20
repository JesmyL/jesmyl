import { bibleIDB } from '@bible/_db/bibleIDB';

export const useBibleCurrentBooki = () => bibleIDB.useValue.booki();
