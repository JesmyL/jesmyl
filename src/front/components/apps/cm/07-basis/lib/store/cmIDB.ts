import { DexieDB } from '#shared/lib/DexieDB';
import { mylib } from '#shared/lib/my-lib';
import { ChordVisibleVariant, PlayerHideMode } from '$cm/Cm.model';
import { defaultCmConfig } from '$cm/translation/complect/controlled/hooks/configs';
import { CmTranslationScreenConfig } from '$cm/translation/complect/controlled/model';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  ChordPack,
  CmComWid,
  CmConstantsConfig,
  ICmComCommentBlock,
  IExportableCat,
  IExportableCom,
  IFixedCom,
  MigratableComToolName,
  ScheduleComPack,
} from 'shared/api';
import { itNumSort } from 'shared/utils';

export interface CmIDBStorage {
  chordPack: ChordPack;

  lastModifiedAt: number;

  comCommentBlocks: ICmComCommentBlock[];
  localComCommentBlocks: ICmComCommentBlock[];

  coms: IExportableCom[];
  fixedComs: IFixedCom[];
  cats: IExportableCat[];
  audioTrackMarks: { src: string; marks: KRecord<number, string> }[];
  scheduleComPacks: ScheduleComPack[];

  translationScreenConfigs: CmTranslationScreenConfig[];

  // remove
  favoriteComs: CmComWid[] | null;
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

      favoriteComs: { $byDefault: null },
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
