import {
  BibleBooki,
  BibleChapteri,
  BibleSearchZone,
  BibleTranslate,
  BibleTranslationAddress,
  BibleTranslationJoinAddress,
  BibleVersei,
} from '#basis/model/bible';
import { BibleTranslationScreenConfig } from 'front/components/apps/bible/translations/model';
import { BibleTranslateName } from 'shared/api';

export interface BibleIDBStorage {
  booki: BibleBooki;
  chapteri: BibleChapteri;
  versei: BibleVersei;

  showTranslates: BibleTranslateName[];
  myTranslates: BibleTranslateName[];

  addressTerm: string;
  searchTerm: string;
  searchZone: BibleSearchZone;

  translationScreenConfigs: BibleTranslationScreenConfig[];
  translationPlan: BibleTranslationAddress[];
  translationHistory: BibleTranslationAddress[];
  joinAddress: BibleTranslationJoinAddress | nil;
}

export interface BibleTranslatesIDBStorage extends Record<BibleTranslateName, null | BibleTranslate> {
  [BibleTranslateName.rst]: BibleTranslate;

  lastModifiedAt: number;
}
