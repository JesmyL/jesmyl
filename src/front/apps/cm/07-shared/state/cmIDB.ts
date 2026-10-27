import { DexieDB } from '#shared/lib/DexieDB';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { cmComWidNumberDictAtom } from '$cm/entities/index';
import type { Transaction } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  ChordPack,
  CmCatWid,
  CmComAudioMarkPack,
  CmComWid,
  CmComWidRefGroupDict,
  ComsInScheduleIntp,
  ComsInSchEventComwsPack,
  ICmComCommentBlock,
  IExportableCat,
  IExportableCom,
  IFixedCom,
  MenuComToolName,
  filterCmComAudioMarkPack,
} from 'shared/api';
import { CmBroadcastScreenConfig } from 'shared/model/cm/broadcast';
import { checkIsNil, checkIsNotNil, checkIsObject } from 'shared/utils/checkIs';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { parseLegacyICat } from 'shared/utils/cm/cat/parseLegacyICat';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectLength } from 'shared/utils/object.utils';
import { cmBroadcastDefaultConfig } from '../const/broadcast';
import type { CmRandomListRow } from '../model/random-list';

type ComAudioMarksRow = { comw: CmComWid; marks: CmComAudioMarkPack | nil; m: number };
type ComWithAudioMarks = { am?: CmComAudioMarkPack | nil };
type MarksWithAudioPack = { marks?: CmComAudioMarkPack | nil };

/** Пустой после фильтрации пак не храним: ни `null`, ни `{}` не должны попасть в store. */
const takeCleanAudioMarkPack = (pack: CmComAudioMarkPack | nil): CmComAudioMarkPack | nil => {
  const filteredPack = filterCmComAudioMarkPack(pack);

  return filteredPack && objectLength(filteredPack) ? filteredPack : null;
};

const cleanComAudioMarks = (com: ComWithAudioMarks) => {
  if (!com.am) return;

  const marks = takeCleanAudioMarkPack(com.am);
  if (marks) com.am = marks;
  else delete com.am;
};

const cleanMarksHolder = (holder: MarksWithAudioPack) => {
  if (holder.marks) holder.marks = takeCleanAudioMarkPack(holder.marks);
};

/** Одноразовая зачистка уже сохранённых legacy-паков при апгрейде схемы IDB. */
const purgeLegacyAudioMarks = async (transaction: Transaction) => {
  await transaction
    .table<ComAudioMarksRow, CmComWid>('comAudioTrackMarks_v3')
    .toCollection()
    .modify(cleanMarksHolder);

  await transaction.table<IExportableCom, CmComWid>('coms').toCollection().modify(cleanComAudioMarks);
};

/** Приводит legacy-категории IDB к актуальному виду: числовой `k` и без лишних полей. */
const parseLegacyCats = async (transaction: Transaction) => {
  const table = transaction.table<IExportableCat, CmCatWid>('cats');
  const cats = (await table.toArray()).map(parseLegacyICat).filter(checkIsNotNil);

  await table.clear();
  if (cats.length) await table.bulkPut(cats);
};

const randomListStore = 'randomList';
const randomListRepairStore = 'randomListRepair';

/**
 * Dexie aborts the whole versionchange when a declared primary key differs from the stored one
 * ("Not yet support for changing primary key"), after which every query on the database hangs and
 * the app renders an empty shell. The shape is therefore checked natively inside the upgrade
 * transaction itself (never by a parallel `indexedDB.open`, which races Dexie): only rows of the
 * ordered auto-incremented `i` store are carried over into the temporary store, any other shape is
 * left to be dropped by this schema step and is recreated from scratch by the next one.
 */
const repairRandomListStore = async (transaction: Transaction) => {
  const nativeDb = transaction.idbtrans.db;
  if (!nativeDb.objectStoreNames.contains(randomListStore)) return;

  const nativeStore = transaction.idbtrans.objectStore(randomListStore);
  if (nativeStore.keyPath !== 'i' || !nativeStore.autoIncrement) return;

  const rows = await transaction.table<CmRandomListRow, number>(randomListStore).toArray();
  if (rows.length) await transaction.table<CmRandomListRow, number>(randomListRepairStore).bulkPut(rows);
};

/** Moves the rows kept by {@link repairRandomListStore} into the recreated store, preserving the shuffle order. */
const restoreRandomListStore = async (transaction: Transaction) => {
  const rows = await transaction.table<CmRandomListRow, number>(randomListRepairStore).toArray();
  if (rows.length) await transaction.table<CmRandomListRow, number>(randomListStore).bulkPut(rows);
};

export interface CmIDBStorage {
  chordPack: ChordPack;

  lastModifiedAt: number;

  comCommentBlocks: ICmComCommentBlock[];
  localComCommentBlocks: ICmComCommentBlock[];

  coms: IExportableCom[];
  /** user com interpretation */
  fixedComs: IFixedCom[];
  cats: IExportableCat[];
  comAudioTrackMarks_v3: ComAudioMarksRow[];
  scheduleComIntp: ComsInScheduleIntp[];
  scheduleComws: ComsInSchEventComwsPack[];

  broadcastScreenConfigs: CmBroadcastScreenConfig[];

  comTopTools: MenuComToolName[] | null;
  lastOpenComw?: CmComWid | null;
  isShowFavouritesInBroadcast: boolean | null;
  selectedComws: CmComWid[] | null;
  laterComwList: number[] | null;
  chordVisibleVariant: ChordVisibleVariant | null;
  comFontSize: number | null;
  speedRollKf: number | null;
  comWidRefDict: CmComWidRefGroupDict;
}

class CmIDB extends DexieDB<CmIDBStorage> {
  constructor() {
    super('cm', {
      chordPack: [{}],
      lastModifiedAt: [0],
      broadcastScreenConfigs: [() => [cmBroadcastDefaultConfig]],

      selectedComws: [null],
      comTopTools: [null],
      chordVisibleVariant: [null],
      comFontSize: [null],
      laterComwList: [null],
      speedRollKf: [null],
      lastOpenComw: [null],
      isShowFavouritesInBroadcast: [null],
      comWidRefDict: [{}],

      coms: {
        w: '++',
        isRemoved: true,
      },
      fixedComs: {
        w: '++',
      },
      cats: {
        w: '++',
        isRemoved: true,
      },
      comCommentBlocks: {
        comw: '++',
      },
      localComCommentBlocks: {
        comw: '++',
      },
      scheduleComIntp: {
        schw: '++',
      },
      scheduleComws: {
        schw: '++',
      },
      comAudioTrackMarks_v3: {
        comw: '++',
      },
    }, 4, async transaction => {
      await purgeLegacyAudioMarks(transaction);
      await parseLegacyCats(transaction);
    }, [
      /**
       * The shuffle store had several shapes over time (`l`-keyed links, `w`-keyed legacy rows,
       * auto-`i` rows). This step drops any leftover store without comparing primary keys, keeping
       * only rows of the ordered `i` shape in a temporary store; the next step recreates `randomList`
       * with the auto-incremented `i` key and moves those rows back.
       */
      [6, { randomList: null, randomListLinks: null, [randomListRepairStore]: '++i' }, repairRandomListStore],
      [7, { [randomListStore]: '++i', [randomListRepairStore]: null }, restoreRandomListStore],
    ]);

    this.db.coms.hook('creating', (_primKey, com) => cleanComAudioMarks(com));
    this.db.coms.hook('updating', modifications => {
      if (checkIsObject(modifications)) cleanComAudioMarks(modifications as ComWithAudioMarks);
    });

    this.db.comAudioTrackMarks_v3.hook('creating', (_primKey, row) => cleanMarksHolder(row));
    this.db.comAudioTrackMarks_v3.hook('updating', modifications => {
      if (checkIsObject(modifications)) cleanMarksHolder(modifications as MarksWithAudioPack);
    });
  }

  useAudioTrackMarks = (comw: CmComWid | nil) =>
    justUseLiveQuery(async () => (comw ? this.tb.comAudioTrackMarks_v3.get({ comw }) : undefined), [comw]);

  fixComTransPos = async (comw: CmComWid, newTransPos: number | null) => {
    await this.updateComFix(comw, async fixed => {
      if (checkIsNil(newTransPos)) delete fixed.ton;
      else fixed.ton = newTransPos;
    });
  };

  updateComFix = async (comw: CmComWid, map: (com: IFixedCom) => void) => {
    const fixed = { ...(await cmIDB.tb.fixedComs.get(comw)), w: comw };

    map(fixed);

    if (objectLength(fixed) === 1) await cmIDB.tb.fixedComs.delete(comw);
    else await cmIDB.tb.fixedComs.put(fixed);
  };
}

const justUseLiveQuery = useLiveQuery;

export const cmIDB = new CmIDB();

export const cmComwListLazyInit = lazyInit(() => {
  cmIDB.tb.coms.toArray().then(coms => {
    const comwNumberDict: PRecord<CmComWid, { i: number; n: string }> = {};
    const numberComwDict: PRecord<number, CmComWid> = {};

    let index = 0;
    const chunkSize = 100;

    function processChunk() {
      const end = Math.min(index + chunkSize, coms.length);

      for (let i = index; i < end; i++) {
        const com = coms[i];
        const comNumber = takeCorrectComNumber(i + 1);
        comwNumberDict[com.w] = { i: comNumber, n: com.n };
        numberComwDict[comNumber] = com.w;
      }

      index = end;

      if (index < coms.length) requestAnimationFrame(processChunk);
      else cmComWidNumberDictAtom.set(comwNumberDict);
    }

    processChunk();
  });
});
