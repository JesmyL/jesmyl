import { BibleTranslationScreenConfig } from './translations/model';

export interface BibleStorage {
  translationBooki: number;
  translationChapteri: number;
  translationVersei: number;
  translationSearchZone: BibleSearchZone;
  translationSearchTerm: string;
  translationSearchResultSelected: number | null;
  translationSearchResultList: BibleTranslationSingleAddress[];
  translationAddressTerm: string;
  translationScreenConfigs: BibleTranslationScreenConfig[];
  translationSlideSyncContentUpdatesNum: number;
  translationTranslationJoinAddress: BibleTranslationJoinAddress | null;
  translationHistory: BibleTranslationAddress[];
  translationPlan: BibleTranslationAddress[];
}

export interface BibleTranslationJoinAddress {
  [booki: number]: {
    [chapteri: number]: number[];
  };
}

export type BibleTranslationSingleAddress = [number, number, number];
export type BibleTranslationAddress = BibleTranslationSingleAddress | BibleTranslationJoinAddress;

export type BibleSearchZone = 'global' | 'inner' | 'address';
