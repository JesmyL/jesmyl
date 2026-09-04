import { bibleBroadcastListSetSingleAddress } from '$bible/entities/broadcast-list';
import { BibleBooki, BibleBroadcastJoinAddress, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { objectKeys } from 'shared/utils/object.utils';

export const bibleAddressWithForceJoinReset = (
  booki?: BibleBooki | nil,
  chapteri?: BibleChapteri | nil,
  versei?: BibleVersei | nil,
) => {
  bibleJoinAddressAtom.reset();
  bibleBroadcastListSetSingleAddress(booki, chapteri, versei);
};

export const useBibleBroadcastJoinAddress = () => useAtomValue(bibleJoinAddressAtom);

export const takeJoinedAddressMaxValues = (joinAddress: BibleBroadcastJoinAddress) => {
  const booki = Math.max(...objectKeys(joinAddress));
  const chapteri = Math.max(...objectKeys(joinAddress[booki]));

  return [booki, chapteri, Math.max(...(joinAddress?.[booki]?.[chapteri] ?? [])) || BibleVersei.def] as const;
};
