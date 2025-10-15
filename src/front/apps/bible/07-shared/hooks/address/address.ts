import { mylib } from '#shared/lib/my-lib';
import { useBibleBroadcastListSingleAddressSetter } from '$bible/entities/broadcast-list';
import { useBibleBroadcastSearchResultSelectedSet } from '$bible/entities/broadcast-search';
import { BibleBooki, BibleChapteri, BibleTranslationJoinAddress, BibleVersei } from '$bible/shared/model/base';
import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { bibleJoinAddressAtom } from '../../state/atoms';

export const useBibleTranslationAddressIndexesSetter = () => {
  const setAddress = useBibleBroadcastListSingleAddressSetter();
  const setResultSelected = useBibleBroadcastSearchResultSelectedSet();

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
        bibleJoinAddressAtom.set(null);
      }

      onClick?.(booki, chapteri, versei);
    };
  };
};

export const useSetBibleAddressIndexes = () => {
  const setAddress = useBibleBroadcastListSingleAddressSetter();
  const setResultSelected = useBibleBroadcastSearchResultSelectedSet();

  return useCallback(
    (booki?: BibleBooki, chapteri?: BibleChapteri, versei?: BibleVersei, resultSelectedi?: number) => {
      setAddress(booki, chapteri, versei);

      if (resultSelectedi !== undefined) {
        setResultSelected(resultSelectedi);
        bibleJoinAddressAtom.set(null);
      }
    },
    [setAddress, setResultSelected],
  );
};

export const useSetBibleAddressWithForceJoinReset = () => {
  const setAddress = useBibleBroadcastListSingleAddressSetter();

  return useCallback(
    (booki?: BibleBooki, chapteri?: BibleChapteri, versei?: BibleVersei) => {
      bibleJoinAddressAtom.set(null);
      setAddress(booki, chapteri, versei);
    },
    [setAddress],
  );
};

export const useBibleTranslationJoinAddress = () => useAtomValue(bibleJoinAddressAtom);

export const useGetterJoinedAddressMaxValues = () =>
  useCallback((joinAddress: BibleTranslationJoinAddress) => {
    const booki = Math.max(...mylib.keys(joinAddress)) as BibleBooki;
    const chapteri = Math.max(...mylib.keys(joinAddress[booki])) as BibleChapteri;

    return [booki, chapteri, Math.max(...joinAddress[booki][chapteri]) as BibleVersei] as const;
  }, []);
