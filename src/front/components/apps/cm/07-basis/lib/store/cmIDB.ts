import { DexieDB } from '#shared/lib/DexieDB';
import { ChordVisibleVariant, PlayerHideMode } from '$cm/Cm.model';
import { defaultCmConfig } from '$cm/translation/complect/controlled/hooks/configs';
import { CmTranslationScreenConfig } from '$cm/translation/complect/controlled/model';
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

  translationScreenConfigs: CmTranslationScreenConfig[];

  comTopTools: MigratableComToolName[] | null;
  constantsConfig: CmConstantsConfig | null;
  lastOpenComw?: CmComWid | null;
  isShowFavouritesInTranslations: boolean | null;
  selectedComws: CmComWid[] | null;
  laterComwList: number[] | null;
  chordVisibleVariant: ChordVisibleVariant | null;
  comFontSize: number | null;
  playerHideMode: PlayerHideMode | null;
  speedRollKf: number | null;
}

class CmIDB extends DexieDB<CmIDBStorage> {
  constructor() {
    super('cm', {
      chordPack: { $byDefault: {} },
      lastModifiedAt: { $byDefault: 0 },
      translationScreenConfigs: { $byDefault: [defaultCmConfig] },

      selectedComws: { $byDefault: null },
      comTopTools: { $byDefault: null },
      chordVisibleVariant: { $byDefault: null },
      comFontSize: { $byDefault: null },
      laterComwList: { $byDefault: null },
      playerHideMode: { $byDefault: null },
      speedRollKf: { $byDefault: null },
      lastOpenComw: { $byDefault: null },
      isShowFavouritesInTranslations: { $byDefault: null },
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
