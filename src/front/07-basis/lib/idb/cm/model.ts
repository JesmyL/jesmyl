import { ChordVisibleVariant, FavoriteMeetings, PlayerHideMode } from 'front/components/apps/cm/Cm.model';
import { CmTranslationScreenConfig } from 'front/components/apps/cm/translation/complect/controlled/model';
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
  metronome: {
    isHide: boolean;
    accentes: string;
    mainSound: `${number}`;
    secondarySound: `${number}`;
  };
  eventContext: number[];
  favoriteMeetings: FavoriteMeetings;

  speedRollKf: number;
}
