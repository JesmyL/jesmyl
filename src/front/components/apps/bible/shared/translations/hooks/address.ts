import { bibleTitles } from '#basis/consts/bibleTitles';
import { mylib } from '#shared/lib/my-lib';
import { bibleIDB } from '@bible/_db/bibleIDB';
import { BibleBooki, BibleChapteri, BibleTranslationJoinAddress, BibleVersei } from '@bible/model';
import { useBibleTranslationSearchResultSelectedSet } from '@bible/shared/translations/hooks/results';
import { useCallback } from 'react';
import { useBibleSingleAddressSetter } from '../atoms';

export const useBibleTranslationAddressIndexesSetter = () => {
  const setAddress = useBibleSingleAddressSetter();
  const setResultSelected = useBibleTranslationSearchResultSelectedSet();

  return (
    booki: BibleBooki,
    chapteri: BibleChapteri,
    versei: BibleVersei,
    resultSelectedi?: number,
    onClick?: (booki: BibleBooki, chapteri: BibleChapteri, versei: BibleVersei) => void,
  ) => {
    return () => {
      setAddress(booki, chapteri, versei);
      if (resultSelectedi !== undefined) {
        setResultSelected(resultSelectedi);
        bibleIDB.set.joinAddress(null);
      }

      onClick?.(booki, chapteri, versei);
    };
  };
};

export const useSetBibleAddressIndexes = () => {
  const setAddress = useBibleSingleAddressSetter();
  const setResultSelected = useBibleTranslationSearchResultSelectedSet();

  return useCallback(
    (booki?: BibleBooki, chapteri?: BibleChapteri, versei?: BibleVersei, resultSelectedi?: number) => {
      setAddress(booki, chapteri, versei);

      if (resultSelectedi !== undefined) {
        setResultSelected(resultSelectedi);
        bibleIDB.set.joinAddress(null);
      }
    },
    [setAddress, setResultSelected],
  );
};

export const useSetBibleAddressWithForceJoinReset = () => {
  const setAddress = useBibleSingleAddressSetter();

  return useCallback(
    (booki?: BibleBooki, chapteri?: BibleChapteri, versei?: BibleVersei) => {
      bibleIDB.set.joinAddress(null);
      setAddress(booki, chapteri, versei);
    },
    [setAddress],
  );
};

export const useBibleTranslationJoinAddress = () => bibleIDB.useValue.joinAddress();

export const useGetterJoinedAddressMaxValues = () =>
  useCallback((joinAddress: BibleTranslationJoinAddress) => {
    const booki = Math.max(...mylib.keys(joinAddress)) as BibleBooki;
    const chapteri = Math.max(...mylib.keys(joinAddress[booki])) as BibleChapteri;

    return [booki, chapteri, Math.max(...joinAddress[booki][chapteri]) as BibleVersei] as const;
  }, []);

export const useBibleSimpleAddressText = (
  booki: BibleBooki,
  chapteri: BibleChapteri,
  versei: BibleVersei,
  titleVariant: 0 | 1 = 0,
) => {
  return `${bibleTitles.titles[booki][titleVariant]} ${chapteri + 1}:${versei + 1}`;
};
