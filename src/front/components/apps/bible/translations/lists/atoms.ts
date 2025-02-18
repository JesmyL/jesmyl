import { bibleIDB } from '#basis/lib/idb/bible';
import { useCallback } from 'react';
import { BibleBooki, BibleChapteri, BibleVersei } from '../../../../../07-basis/model/bible';

export const useBibleBooki = () => bibleIDB.use.booki();
export const useBibleChapteri = () => bibleIDB.use.chapteri();
export const useBibleVersei = () => bibleIDB.use.versei();

export const useBibleSingleAddressSetter = () => {
  return useCallback((booki?: BibleBooki, chapteri?: BibleChapteri, versei?: BibleVersei) => {
    if (booki !== undefined) bibleIDB.set.booki(booki);
    if (chapteri !== undefined) bibleIDB.set.chapteri(chapteri);
    if (versei !== undefined) bibleIDB.set.versei(versei);
  }, []);
};
