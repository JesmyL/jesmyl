import { DexieDB } from '#shared/lib/DexieDB';
import { BibleTranslateName } from 'shared/api';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';
import {
  BibleBooki,
  BibleBroadcastAddress,
  BibleBroadcastJoinAddress,
  BibleChapteri,
  BibleTranslate,
  BibleVersei,
} from '../model/base';

export interface BibleIDBStorage {
  booki: BibleBooki | null;
  chapteri: BibleChapteri | null;
  versei: BibleVersei | null;
  showTranslates: BibleTranslateName[] | null;
  myTranslates: BibleTranslateName[] | null;
  joinAddress: BibleBroadcastJoinAddress | nil;

  broadcastPlan: BibleBroadcastAddress[] | nil;
  broadcastHistory: BibleBroadcastAddress[] | nil;
  broadcastScreenConfigs: BibleBroadcastScreenConfig[];
}

interface BibleTranslatesIDBStorage extends Record<BibleTranslateName, null | BibleTranslate> {
  [BibleTranslateName.rst]: BibleTranslate;

  lastModifiedAt: number;
}

class BibleTranslatesIDB extends DexieDB<BibleTranslatesIDBStorage> {}
export const bibleTranslatesIDB = new BibleTranslatesIDB('bibleTranslates', {
  lastModifiedAt: [0],

  rst: [{ chapters: [] }],
  nrt: [null],
  kas: [null],
  kzb: [null],
});

class BibleIDB extends DexieDB<BibleIDBStorage> {}
export const bibleIDB = new BibleIDB('bible', {
  booki: [null],
  chapteri: [null],
  versei: [null],
  joinAddress: [null],
  showTranslates: [null],
  myTranslates: [null],

  broadcastPlan: [null],
  broadcastHistory: [null],
  broadcastScreenConfigs: [[]],
});
