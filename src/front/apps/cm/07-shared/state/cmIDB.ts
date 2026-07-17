import { DexieDB } from '#shared/lib/DexieDB';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { cmComWidNumberDictAtom } from '$cm/entities/index';
import { cmBroadcastDefaultConfig } from '$cm/widgets/broadcast';
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
  MigratableComToolName,
} from 'shared/api';
import { CmBroadcastScreenConfig } from 'shared/model/cm/broadcast';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';

export interface CmIDBStorage {
  chordPack: ChordPack;

  lastModifiedAt: number;

  comCommentBlocks: ICmComCommentBlock[];
  localComCommentBlocks: ICmComCommentBlock[];

  coms: IExportableCom[];
  /** user com interpretation */
  fixedComs: IFixedCom[];
  cats: IExportableCat[];
  comAudioTrackMarks_v1: { comw: CmComWid; marks: CmComAudioMarkPack | nil; m: number }[];
  scheduleComIntp: ComsInScheduleIntp[];
  scheduleComws: ComsInSchEventComwsPack[];

  broadcastScreenConfigs: CmBroadcastScreenConfig[];

  comTopTools: MigratableComToolName[] | null;
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
      comAudioTrackMarks_v1: {
        src: '++',
      },
    });
  }

  useAudioTrackMarks = (comw: CmComWid | nil) =>
    justUseLiveQuery(async () => (comw ? this.tb.comAudioTrackMarks_v1.get({ comw }) : undefined), [comw]);
}

const justUseLiveQuery = useLiveQuery;

export const cmIDB = new CmIDB();

cmIDB.tb.coms
  .toCollection()
  .keys()
  .then(keys => {
    const comwNumberDict: PRecord<CmComWid, number> = {};
    const numberComwDict: PRecord<number, CmComWid> = {};

    keys.forEach((key, keyi) => {
      const comNumber = takeCorrectComNumber(keyi + 1);
      comwNumberDict[key as CmComWid] = comNumber;
      numberComwDict[comNumber] = key as CmComWid;
    });

    cmComWidNumberDictAtom.set(comwNumberDict);
  });
