import { BibleTranslateName } from 'shared/api';
import { BibleTitleCodei } from 'shared/model/bible/enums';

export type BibleBooki = BibleTitleCodei;

export const enum BibleChapteri {
  def = 0,
  none = -1,
}

export const enum BibleVersei {
  def = 0,
  none = -1,
}

export type BibleTranslate = { chapters: string[][][] };

export type BibleSingleAddressCode = [BibleBooki, BibleChapteri, BibleVersei];

export type BibleBroadcastJoinAddress = Record<BibleBooki, Record<BibleChapteri, BibleVersei[]>>;
export type BibleBroadcastAnyAddress = BibleBroadcastJoinAddress | [BibleBooki, BibleChapteri, BibleVersei];

export type BibleBroadcastSingleAddress = [number, number, number];
export type BibleBroadcastAddress = BibleBroadcastSingleAddress | BibleBroadcastJoinAddress;

export const enum BibleSearchZone {
  Global,
  Inner,
  Address,
}

export const enum BibleSearchInnerZone {
  Book,
  Chapter,
}

export interface BibleStorage extends Record<BibleTranslateName, null | BibleTranslate> {
  [BibleTranslateName.rst]: BibleTranslate;
}
