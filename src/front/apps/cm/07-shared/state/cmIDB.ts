import { DexieDB } from '#shared/lib/DexieDB';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { cmComWidNumberDictAtom } from '$cm/entities/index';
import type { Transaction } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  ChordPack,
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
import { checkIsNil, checkIsObject } from 'shared/utils/checkIs';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectLength } from 'shared/utils/object.utils';
import { cmBroadcastDefaultConfig } from '../const/broadcast';

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
    }, 2, purgeLegacyAudioMarks);

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
