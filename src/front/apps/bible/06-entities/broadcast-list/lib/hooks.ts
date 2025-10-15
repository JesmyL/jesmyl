import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleBookiAtom, bibleChapteriAtom, bibleVerseiAtom } from '$bible/shared/state/atoms';
import { useCallback } from 'react';

export const useBibleBroadcastListSingleAddressSetter = () => {
  return useCallback((booki?: BibleBooki, chapteri?: BibleChapteri, versei?: BibleVersei) => {
    if (booki !== undefined) bibleBookiAtom.set(booki);
    if (chapteri !== undefined) bibleChapteriAtom.set(chapteri);
    if (versei !== undefined) bibleVerseiAtom.set(versei);
  }, []);
};
