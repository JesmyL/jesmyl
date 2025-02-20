import { DexieDB } from '#shared/lib/_DexieDB';
import {
  BibleBooki,
  BibleChapteri,
  BibleSearchZone,
  BibleTranslate,
  BibleTranslationAddress,
  BibleTranslationJoinAddress,
  BibleVersei,
} from '@bible/model';
import { BibleTranslationScreenConfig } from '@bible/translations/model';
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

interface BibleTranslatesIDBStorage extends Record<BibleTranslateName, null | BibleTranslate> {
  [BibleTranslateName.rst]: BibleTranslate;

  lastModifiedAt: number;
}

class BibleTranslatesIDB extends DexieDB<BibleTranslatesIDBStorage> {}
export const bibleTranslatesIDB = new BibleTranslatesIDB('bibleTranslates', {
  lastModifiedAt: { $byDefault: 0 },

  rst: { $byDefault: { chapters: [] } },
  nrt: { $byDefault: null },
  kas: { $byDefault: null },
});

class BibleIDB extends DexieDB<BibleIDBStorage> {}
export const bibleIDB = new BibleIDB('bible', {
  booki: { $byDefault: BibleBooki.def },
  chapteri: { $byDefault: BibleChapteri.def },
  versei: { $byDefault: BibleVersei.def },

  searchTerm: { $byDefault: '' },
  addressTerm: { $byDefault: '' },
  searchZone: { $byDefault: 'global' },

  showTranslates: { $byDefault: [BibleTranslateName.rst] },
  myTranslates: { $byDefault: [BibleTranslateName.rst] },
  translationPlan: { $byDefault: [] },
  translationHistory: { $byDefault: [] },
  translationScreenConfigs: { $byDefault: [] },
  joinAddress: { $byDefault: null },
});
