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
  audioTrackMarks: { src: string; marks?: CmComAudioMarkPack; m: number }[];
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
      chordPack: { $byDefault: {} },
      lastModifiedAt: { $byDefault: 0 },
      broadcastScreenConfigs: { $byDefault: () => [cmBroadcastDefaultConfig] },

      selectedComws: { $byDefault: null },
      comTopTools: { $byDefault: null },
      chordVisibleVariant: { $byDefault: null },
      comFontSize: { $byDefault: null },
      laterComwList: { $byDefault: null },
      speedRollKf: { $byDefault: null },
      lastOpenComw: { $byDefault: null },
      isShowFavouritesInBroadcast: { $byDefault: null },
      constantsConfig: { $byDefault: null },

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
      audioTrackMarks: {
        src: '++',
      },
    });
  }

  useAudioTrackMarks = (src: string | nil) =>
    useLiveQuery(async () => (src ? this.tb.audioTrackMarks.get({ src }) : undefined), [src]);
}

export const cmIDB = new CmIDB();
