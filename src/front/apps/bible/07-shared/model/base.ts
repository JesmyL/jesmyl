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

export type BibleBroadcastJoinAddress = PRecord<BibleBooki, PRecord<BibleChapteri, BibleVersei[]>>;
export type BibleBroadcastAnyAddress = BibleBroadcastJoinAddress | BibleSingleAddressCode;

export type BibleBroadcastSingleAddress = [number, number, number];
export type BibleBroadcastAddress = BibleSingleAddressCode | BibleBroadcastJoinAddress;

export type BibleBroadcastTextMapBlock = { head?: string; texts: { text: string; address?: string }[] };

export interface BibleStorage extends Record<BibleTranslateName, null | BibleTranslate> {
  [BibleTranslateName.rst]: BibleTranslate;
}
