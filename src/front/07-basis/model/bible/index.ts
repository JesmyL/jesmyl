import { BibleTranslateName } from 'shared/api';

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

export type BibleTranslate = { chapters: string[][][] };

export type BibleVersePath = `${string}${string}${string}${BibleTranslateName}`;
export type BibleVersePathParts = [BibleTranslateName, BibleBooki, BibleChapteri, BibleVersei];

export type BibleTranslationJoinAddress = Record<BibleBooki, Record<BibleChapteri, BibleVersei[]>>;

export type BibleTranslationSingleAddress = [number, number, number];
export type BibleTranslationAddress = BibleTranslationSingleAddress | BibleTranslationJoinAddress;

export type BibleSearchZone = 'global' | 'inner' | 'address';

export interface BibleStorage extends Record<BibleTranslateName, null | BibleTranslate> {
  [BibleTranslateName.rst]: BibleTranslate;
}
