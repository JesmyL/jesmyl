import { bibleBroadcastListSingleAddressSet } from '$bible/entities/broadcast-list';
import { BibleBooki, BibleBroadcastJoinAddress, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { checkIsNotUndefined } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';

export const bibleBroadcastAddressSetIndexes = (
  booki: BibleBooki,
  chapteri: BibleChapteri,
  versei: BibleVersei,
  resultSelectedi?: number,
  onClick?: (booki: BibleBooki, chapteri: BibleChapteri, versei: BibleVersei) => void,
) => {
  bibleBroadcastListSingleAddressSet(booki, chapteri, versei);
  if (checkIsNotUndefined(resultSelectedi)) {
    // bibleBroadcastSearchResultSelectedAtom.set(resultSelectedi);
    bibleJoinAddressAtom.reset();
  }

  onClick?.(booki, chapteri, versei);
};

export const bibleAddressIndexesUpdate = (
  booki?: BibleBooki,
  chapteri?: BibleChapteri,
  versei?: BibleVersei,
  resultSelectedi?: number,
) => {
  bibleBroadcastListSingleAddressSet(booki, chapteri, versei);

  if (checkIsNotUndefined(resultSelectedi)) {
    // bibleBroadcastSearchResultSelectedAtom.set(resultSelectedi);
    bibleJoinAddressAtom.reset();
  }
};

export const bibleAddressWithForceJoinReset = (
  booki?: BibleBooki | nil,
  chapteri?: BibleChapteri | nil,
  versei?: BibleVersei | nil,
) => {
  bibleJoinAddressAtom.reset();
  bibleBroadcastListSingleAddressSet(booki, chapteri, versei);
};

export const useBibleBroadcastJoinAddress = () => useAtomValue(bibleJoinAddressAtom);

export const takeJoinedAddressMaxValues = (joinAddress: BibleBroadcastJoinAddress) => {
  const booki = Math.max(...objectKeys(joinAddress));
  const chapteri = Math.max(...objectKeys(joinAddress[booki]));

  return [booki, chapteri, Math.max(...(joinAddress?.[booki]?.[chapteri] ?? [])) || BibleVersei.def] as const;
};
