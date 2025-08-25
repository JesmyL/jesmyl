import { bibleBookiAtom, bibleChapteriAtom, bibleVerseiAtom } from '$bible/basis/lib/store/atoms';
import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/basis/model/base';
import { useCallback } from 'react';

export const useBibleSingleAddressSetter = () => {
  return useCallback((booki?: BibleBooki, chapteri?: BibleChapteri, versei?: BibleVersei) => {
    if (booki !== undefined) bibleBookiAtom.set(booki);
    if (chapteri !== undefined) bibleChapteriAtom.set(chapteri);
    if (versei !== undefined) bibleVerseiAtom.set(versei);
  }, []);
};
