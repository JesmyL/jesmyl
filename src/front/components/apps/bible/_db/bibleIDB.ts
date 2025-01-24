import { DexieDB } from 'front/complect/_DexieDB';
import {
  BibleBooki,
  BibleChapteri,
  BibleSearchZone,
  BibleTranslationAddress,
  BibleTranslationJoinAddress,
  BibleVersei,
} from '../model';
import { BibleTranslateNameLine } from '../translates/complect';
import { BibleTranslationScreenConfig } from '../translations/model';

export interface BibleIDBStorage {
  booki: BibleBooki;
  chapteri: BibleChapteri;
  versei: BibleVersei;

  showTranslates: BibleTranslateNameLine;
  myTranslates: BibleTranslateNameLine;

  addressTerm: string;
  searchTerm: string;
  searchZone: BibleSearchZone;

  translationScreenConfigs: BibleTranslationScreenConfig[];
  translationPlan: BibleTranslationAddress[];
  translationHistory: BibleTranslationAddress[];
  joinAddress: BibleTranslationJoinAddress | nil;
}

class BibleIDB extends DexieDB<BibleIDBStorage> {
  constructor() {
    super('bible', {
      booki: { $byDefault: BibleBooki.def },
      chapteri: { $byDefault: BibleChapteri.def },
      versei: { $byDefault: BibleVersei.def },

      searchTerm: { $byDefault: '' },
      addressTerm: { $byDefault: '' },
      searchZone: { $byDefault: 'global' },

      showTranslates: { $byDefault: ['rst'] },
      myTranslates: { $byDefault: ['rst'] },
      translationPlan: { $byDefault: [] },
      translationHistory: { $byDefault: [] },
      translationScreenConfigs: { $byDefault: [] },
      joinAddress: { $byDefault: null },
    });
  }
}

export const bibleIDB = new BibleIDB();
