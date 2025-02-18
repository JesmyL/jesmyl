import { BibleBooki, BibleChapteri, BibleVersei } from '#basis/model/bible';
import { DexieDB } from 'front/08-shared/lib/_DexieDB';
import { BibleTranslateName } from 'shared/api';
import { BibleIDBStorage, BibleTranslatesIDBStorage } from './model';

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
