import { DexieDB } from '#shared/lib/DexieDB';
import { mylib } from '#shared/lib/my-lib';
import { ChordVisibleVariant, FavoriteMeetings, PlayerHideMode } from '$cm/Cm.model';
import { defaultCmConfig } from '$cm/translation/complect/controlled/hooks/configs';
import { CmTranslationScreenConfig } from '$cm/translation/complect/controlled/model';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  ChordPack,
  CmComWid,
  CmConstantsConfig,
  ICmComComment,
  ICmComCommentBlock,
  IExportableCat,
  IExportableCom,
  IFixedCom,
  MigratableComToolName,
  ScheduleComPack,
} from 'shared/api';
import { itNumSort } from 'shared/utils';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';

export interface CmIDBStorage {
  chordPack: ChordPack;
  favoriteComs: CmComWid[];
  comTopTools: MigratableComToolName[];
  constantsConfig: CmConstantsConfig;

  lastModifiedAt: number;

  /** @deprecated */
  comComments: ICmComComment[];
  comCommentBlocks: ICmComCommentBlock[];
  localComCommentBlocks: ICmComCommentBlock[];

  coms: IExportableCom[];
  fixedComs: IFixedCom[];
  cats: IExportableCat[];
  audioTrackMarks: { src: string; marks: KRecord<number, string> }[];

  lastOpenComw?: CmComWid;
  isShowFavouritesInTranslations: boolean;

  scheduleComPacks: ScheduleComPack[];
  selectedComws: CmComWid[];

  laterComwList: number[];
  chordVisibleVariant: ChordVisibleVariant;
  comFontSize: number;

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
      favoriteComs: { $byDefault: [] },
      selectedComws: { $byDefault: [] },
      comTopTools: { $byDefault: ['mark-com', 'fullscreen-mode', 'chords-variant'] as never },

      chordVisibleVariant: { $byDefault: ChordVisibleVariant.Maximal },
      comFontSize: { $byDefault: 14 },
      eventContext: { $byDefault: [] },
      favoriteMeetings: { $byDefault: { contexts: [], events: [] } },
      laterComwList: { $byDefault: [] },
      playerHideMode: { $byDefault: 'expand' },
      speedRollKf: { $byDefault: 10 },
      translationScreenConfigs: { $byDefault: [defaultCmConfig] },
      lastOpenComw: { $byDefault: undefined },
      isShowFavouritesInTranslations: { $byDefault: false },
      constantsConfig: { $byDefault: cmConstantsDefaultConfig },

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

  useAudioTrackMarks = (src: string) => useLiveQuery(() => this.tb.audioTrackMarks.get({ src }), [src]);

  addAudioTrackMark = async (src: string, time: number, text: string) => {
    const prevMarks = await this.tb.audioTrackMarks.get({ src });
    let addMarks: KRecord<number, string> = {};
    const marks: KRecord<number, string> = {};

    if (prevMarks != null) addMarks = { ...prevMarks.marks };
    addMarks[time] = text;

    mylib
      .keys(addMarks)
      .map(Number)
      .sort(itNumSort)
      .forEach(time => (marks[time] = addMarks[time]));

    this.tb.audioTrackMarks.put({ src, marks });
  };

  deleteAudioTrackMark = async (src: string, time: number) => {
    const prevMarks = await this.tb.audioTrackMarks.get({ src });
    const marks: KRecord<number, string> = { ...prevMarks?.marks };

    delete marks[time];

    this.tb.audioTrackMarks.put({ src, marks });
  };
}

export const cmIDB = new CmIDB();
