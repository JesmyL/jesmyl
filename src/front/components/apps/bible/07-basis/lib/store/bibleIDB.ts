import { DexieDB } from '#shared/lib/DexieDB';
import {
  BibleBooki,
  BibleChapteri,
  BibleTranslate,
  BibleTranslationAddress,
  BibleTranslationJoinAddress,
  BibleVersei,
} from '$bible/basis/model/base';
import { BibleTranslationScreenConfig } from '$bible/translations/model';
import { Atom } from 'atomaric';
import { BibleTranslateName } from 'shared/api';
import {
  bibleBookiAtom,
  bibleChapteriAtom,
  bibleJoinAddressAtom,
  bibleMyTranslatesAtom,
  bibleShowTranslatesAtom,
  bibleVerseiAtom,
} from './atoms';

export interface BibleIDBStorage {
  booki: BibleBooki | null;
  chapteri: BibleChapteri | null;
  versei: BibleVersei | null;
  showTranslates: BibleTranslateName[] | null;
  myTranslates: BibleTranslateName[] | null;
  joinAddress: BibleTranslationJoinAddress | nil;

  translationPlan: BibleTranslationAddress[];
  translationHistory: BibleTranslationAddress[];
  translationScreenConfigs: BibleTranslationScreenConfig[];
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
  booki: { $byDefault: null },
  chapteri: { $byDefault: null },
  versei: { $byDefault: null },
  joinAddress: { $byDefault: null },
  showTranslates: { $byDefault: null },
  myTranslates: { $byDefault: null },

  translationPlan: { $byDefault: [] },
  translationHistory: { $byDefault: [] },
  translationScreenConfigs: { $byDefault: [] },
});

(async () => {
  const removeWithAtomSet = async <
    Key extends keyof typeof bibleIDB.tb,
    Value extends Awaited<ReturnType<(typeof bibleIDB.get)[Key]>>,
  >(
    key: Key,
    atom: Atom<Value>,
  ) => {
    const value = (await bibleIDB.get[key]()) as Value;
    if (value == null) return;
    atom.set(value);
    bibleIDB.remove[key]();
  };

  await removeWithAtomSet('booki', bibleBookiAtom);
  await removeWithAtomSet('chapteri', bibleChapteriAtom);
  await removeWithAtomSet('versei', bibleVerseiAtom);
  await removeWithAtomSet('showTranslates', bibleShowTranslatesAtom);
  await removeWithAtomSet('myTranslates', bibleMyTranslatesAtom);
  await removeWithAtomSet('joinAddress', bibleJoinAddressAtom);
})();
