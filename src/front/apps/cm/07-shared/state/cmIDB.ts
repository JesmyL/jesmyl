import { DexieDB } from '#shared/lib/DexieDB';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { cmComWidNumberDictAtom } from '$cm/entities/index';
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
} from 'shared/api';
import { CmBroadcastScreenConfig } from 'shared/model/cm/broadcast';
import { checkIsNil } from 'shared/utils/checkIs';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectLength } from 'shared/utils/object.utils';
import { cmBroadcastDefaultConfig } from '../const/broadcast';

export interface CmIDBStorage {
  chordPack: ChordPack;

  lastModifiedAt: number;

  comCommentBlocks: ICmComCommentBlock[];
  localComCommentBlocks: ICmComCommentBlock[];

  coms: IExportableCom[];
  /** user com interpretation */
  fixedComs: IFixedCom[];
  cats: IExportableCat[];
  comAudioTrackMarks_v3: { comw: CmComWid; marks: CmComAudioMarkPack | nil; m: number }[];
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
    });
  }

  useAudioTrackMarks = (comw: CmComWid | nil) =>
    justUseLiveQuery(async () => (comw ? this.tb.comAudioTrackMarks_v3.get({ comw }) : undefined), [comw]);

  fixComTransPos = async (comw: CmComWid, newTransPos: number | null) => {
    const fixed = { ...(await cmIDB.tb.fixedComs.get(comw)), w: comw };

    if (checkIsNil(newTransPos)) delete fixed.ton;
    else {
      const com = await cmIDB.tb.coms.get(comw);

      if (com?.p === newTransPos) delete fixed.ton;
      else fixed.ton = newTransPos;
    }

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
