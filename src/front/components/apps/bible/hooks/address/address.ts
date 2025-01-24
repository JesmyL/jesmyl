import { mylib } from 'front/utils';
import { useCallback } from 'react';
import { bibleIDB } from '../../_db/bibleIDB';
import { BibleBooki, BibleChapteri, BibleTranslationJoinAddress, BibleVersei } from '../../model';
import { useBibleSingleAddressSetter } from '../../translations/lists/atoms';
import { useBibleTranslationSearchResultSelectedSet } from '../../translations/search/hooks/results';

export const useBibleTranslationAddressIndexesSetter = () => {
  const setJoin = useBibleTranslationJoinAddressSetter();
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
        setJoin(null);
      }

      onClick?.(booki, chapteri, versei);
    };
  };
};

export const useSetBibleAddressIndexes = () => {
  const setJoin = useBibleTranslationJoinAddressSetter();
  const setAddress = useBibleSingleAddressSetter();
  const setResultSelected = useBibleTranslationSearchResultSelectedSet();

  return useCallback(
    (booki?: BibleBooki, chapteri?: BibleChapteri, versei?: BibleVersei, resultSelectedi?: number) => {
      setAddress(booki, chapteri, versei);

      if (resultSelectedi !== undefined) {
        setResultSelected(resultSelectedi);
        setJoin(null);
      }
    },
    [setAddress, setJoin, setResultSelected],
  );
};

export const useSetBibleAddressWithForceJoinReset = () => {
  const setJoin = useBibleTranslationJoinAddressSetter();
  const setAddress = useBibleSingleAddressSetter();

  return useCallback(
    (booki?: BibleBooki, chapteri?: BibleChapteri, versei?: BibleVersei) => {
      setJoin(null);
      setAddress(booki, chapteri, versei);
    },
    [setAddress, setJoin],
  );
};

export const useBibleTranslationJoinAddress = () => bibleIDB.useValue.joinAddress();
export const useBibleTranslationJoinAddressSetter = () => bibleIDB.useSet.joinAddress();

export const useGetterJoinedAddressMaxValues = () =>
  useCallback((joinAddress: BibleTranslationJoinAddress) => {
    const booki = Math.max(...mylib.keys(joinAddress)) as BibleBooki;
    const chapteri = Math.max(...mylib.keys(joinAddress[booki])) as BibleChapteri;

    return [booki, chapteri, Math.max(...joinAddress[booki][chapteri]) as BibleVersei] as const;
  }, []);
