import { bibleIDB } from '$bible/basis/lib/bibleIDB';
import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/basis/model/base';
import { useCallback } from 'react';

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
