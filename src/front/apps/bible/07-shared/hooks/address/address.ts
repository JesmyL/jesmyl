import { bibleBroadcastListSingleAddressSet } from '$bible/entities/broadcast-list';
import { bibleBroadcastSearchResultSelectedAtom } from '$bible/entities/broadcast-search';
import { BibleBooki, BibleBroadcastJoinAddress, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { checkIsNotUndefined } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';

export const useBibleBroadcastAddressIndexesSetter = () => {
  return (
    booki: BibleBooki,
    chapteri: BibleChapteri,
    versei: BibleVersei,
    resultSelectedi?: number,
    onClick?: (booki: BibleBooki, chapteri: BibleChapteri, versei: BibleVersei) => void,
  ) => {
    return () => {
      bibleBroadcastListSingleAddressSet(booki, chapteri, versei);
      if (checkIsNotUndefined(resultSelectedi)) {
        bibleBroadcastSearchResultSelectedAtom.set(resultSelectedi);
        bibleJoinAddressAtom.set(null);
      }

      onClick?.(booki, chapteri, versei);
    };
  };
};

export const bibleAddressIndexesUpdate = (
  booki?: BibleBooki,
  chapteri?: BibleChapteri,
  versei?: BibleVersei,
  resultSelectedi?: number,
) => {
  bibleBroadcastListSingleAddressSet(booki, chapteri, versei);

  if (checkIsNotUndefined(resultSelectedi)) {
    bibleBroadcastSearchResultSelectedAtom.set(resultSelectedi);
    bibleJoinAddressAtom.set(null);
  }
};

export const bibleAddressWithForceJoinReset = (booki?: BibleBooki, chapteri?: BibleChapteri, versei?: BibleVersei) => {
  bibleJoinAddressAtom.set(null);
  bibleBroadcastListSingleAddressSet(booki, chapteri, versei);
};

export const useBibleBroadcastJoinAddress = () => useAtomValue(bibleJoinAddressAtom);

export const takeJoinedAddressMaxValues = (joinAddress: BibleBroadcastJoinAddress) => {
  const booki = Math.max(...(objectKeys(joinAddress) as never as number[])) as BibleBooki;
  const chapteri = Math.max(...(objectKeys(joinAddress[booki]) as never as number[])) as BibleChapteri;

  return [booki, chapteri, Math.max(...joinAddress[booki][chapteri]) as BibleVersei] as const;
};
