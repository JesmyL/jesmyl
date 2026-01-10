import { DexieDB } from '#shared/lib/DexieDB';
import { CmBroadcastScreenConfig, cmBroadcastDefaultConfig } from '$cm/widgets/broadcast';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  ChordPack,
  CmComAudioMarkPack,
  CmComWid,
  CmConstantsConfig,
  ICmComCommentBlock,
  IExportableCat,
  IExportableCom,
  IFixedCom,
  MigratableComToolName,
  ScheduleComPack,
} from 'shared/api';
import { ChordVisibleVariant } from '../model/Cm.model';

export interface CmIDBStorage {
  chordPack: ChordPack;

  lastModifiedAt: number;

  comCommentBlocks: ICmComCommentBlock[];
  localComCommentBlocks: ICmComCommentBlock[];

  coms: IExportableCom[];
  fixedComs: IFixedCom[];
  cats: IExportableCat[];
  comAudioTrackMarks: { src: string; cMarks?: CmComAudioMarkPack; m: number }[];
  scheduleComPacks: ScheduleComPack[];

  broadcastScreenConfigs: CmBroadcastScreenConfig[];

  comTopTools: MigratableComToolName[] | null;
  constantsConfig: CmConstantsConfig | null;
  lastOpenComw?: CmComWid | null;
  isShowFavouritesInBroadcast: boolean | null;
  selectedComws: CmComWid[] | null;
  laterComwList: number[] | null;
  chordVisibleVariant: ChordVisibleVariant | null;
  comFontSize: number | null;
  speedRollKf: number | null;
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
      constantsConfig: [null],

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
      scheduleComPacks: {
        schw: '++',
      },
      comAudioTrackMarks: {
        src: '++',
      },
    });
  }

  useAudioTrackMarks = (src: string | nil) =>
    useLiveQuery(async () => (src ? this.tb.comAudioTrackMarks.get({ src }) : undefined), [src]);
}

export const cmIDB = new CmIDB();
