import { DexieDB } from '#shared/lib/DexieDB';
import { BibleTbcvKey, BibleTranslateName } from 'shared/model/bible';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';
import { BibleBroadcastAddress, BibleTranslate } from '../model/base';

export interface BibleIDBStorage {
  broadcastPlan: BibleBroadcastAddress[] | nil;
  broadcastHistory: BibleBroadcastAddress[] | nil;
  broadcastScreenConfigs: BibleBroadcastScreenConfig[];
}

interface BibleTranslatesIDBStorage extends Record<BibleTranslateName, null | BibleTranslate> {
  [BibleTranslateName.rst]: BibleTranslate;

  lastModifiedAt: number;
}

/** @deprecated */
const bibleTranslatesIDB = new (class BibleTranslatesIDB extends DexieDB<BibleTranslatesIDBStorage> {
  constructor() {
    super('bibleTranslates', {
      lastModifiedAt: [0],

      rst: [{ chapters: [] }],
      nrt: [null],
      kas: [null],
      kzb: [null],
    });
  }
})();

bibleTranslatesIDB.remove.kas();
bibleTranslatesIDB.remove.kzb();
bibleTranslatesIDB.remove.nrt();
bibleTranslatesIDB.remove.rst();

export const bibleTBCVTranslatesIDB = new (class BibleTranslatesIDB extends DexieDB<{
  list: { k: BibleTbcvKey; v: string }[];
  lastModifiedAt: number;
}> {
  constructor() {
    super('bibleTBCV', {
      lastModifiedAt: [0],

      list: { k: '++' },
    });
  }
})();

class BibleIDB extends DexieDB<BibleIDBStorage> {}
export const bibleIDB = new BibleIDB('bible', {
  broadcastPlan: [null],
  broadcastHistory: [null],
  broadcastScreenConfigs: [[]],
});
