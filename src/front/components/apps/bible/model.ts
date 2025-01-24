import { BibleTranslate, BibleTranslateName } from './translates/complect';

export const enum BibleBooki {
  def = 0,
  none = -1,
}

export const enum BibleChapteri {
  def = 0,
  none = -1,
}

export const enum BibleVersei {
  def = 0,
  none = -1,
}

export interface BibleStorage extends Record<BibleTranslateName, null | BibleTranslate> {
  rst: BibleTranslate;
}

export type BibleTranslationJoinAddress = Record<BibleBooki, Record<BibleChapteri, BibleVersei[]>>;

export type BibleTranslationSingleAddress = [number, number, number];
export type BibleTranslationAddress = BibleTranslationSingleAddress | BibleTranslationJoinAddress;

export type BibleSearchZone = 'global' | 'inner' | 'address';
