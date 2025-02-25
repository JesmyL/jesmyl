import { DexieDB } from '#shared/lib/DexieDB';
import {
  ChordPack,
  CmComWid,
  EeStorePack,
  ICmComComment,
  IExportableCat,
  IExportableCom,
  IFixedCom,
  MigratableComToolName,
  ScheduleComPack,
} from 'shared/api';
import { ChordVisibleVariant, FavoriteMeetings, PlayerHideMode } from '../Cm.model';
import { defaultCmConfig } from '../translation/complect/controlled/hooks/configs';
import { CmTranslationScreenConfig } from '../translation/complect/controlled/model';

export interface CmIDBStorage {
  chordPack: ChordPack;
  eeStore: EeStorePack;
  favoriteComs: CmComWid[];
  comTopTools: MigratableComToolName[];

  lastModifiedAt: number;

  comComments: ICmComComment[];
  coms: IExportableCom[];
  fixedComs: IFixedCom[];
  cats: IExportableCat[];

  scheduleComPacks: ScheduleComPack[];
  selectedComws: CmComWid[];

  laterComwList: number[];
  chordVisibleVariant: ChordVisibleVariant;
  comFontSize: number;

  isShowComHashComments: boolean;
  isMiniAnchor: boolean;
  playerHideMode: PlayerHideMode;
  translationScreenConfigs: CmTranslationScreenConfig[];
  eventContext: number[];
  favoriteMeetings: FavoriteMeetings;

  speedRollKf: number;
}

class CmIDB extends DexieDB<CmIDBStorage> {
  constructor() {
    super('cm', {
      chordPack: { $byDefault: {} },
      lastModifiedAt: { $byDefault: 0 },
      eeStore: { $byDefault: {} },
      favoriteComs: { $byDefault: [] },
      selectedComws: { $byDefault: [] },
      comTopTools: { $byDefault: ['mark-com', 'fullscreen-mode', 'chords-variant'] as never },

      chordVisibleVariant: { $byDefault: ChordVisibleVariant.Maximal },
      comFontSize: { $byDefault: 14 },
      eventContext: { $byDefault: [] },
      favoriteMeetings: { $byDefault: { contexts: [], events: [] } },
      isMiniAnchor: { $byDefault: false },
      isShowComHashComments: { $byDefault: true },
      laterComwList: { $byDefault: [] },
      playerHideMode: { $byDefault: 'expand' },
      speedRollKf: { $byDefault: 10 },
      translationScreenConfigs: { $byDefault: [defaultCmConfig] },

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
      comComments: {
        comw: '++',
        isSavedLocal: true,
      },
      scheduleComPacks: {
        schw: '++',
      },
    });
  }
}

export const cmIDB = new CmIDB();
