import { IExportableMeetings } from '../../../../shared/api/complect/apps/cm/complect/Meetings';
import { ClientExecutionDict } from '../../../complect/exer/Exer.model';
import { IExportableSetts } from './col/com/block-styles/BlockStyles.model';
import { CmTranslationScreenConfig } from './translation/complect/controlled/model';

export type CmRollMode = 'pause' | 'play' | null;

export enum ChordVisibleVariant {
  None = 0,
  Minimal = 1,
  Maximal = 2,
}

export type FavoriteMeetings = Record<'events' | 'contexts', number[]>;
export interface CmState {
  laterComwList: number[];
  chordVisibleVariant: ChordVisibleVariant;
  meetings: IExportableMeetings;
  comFontSize: number;

  isShowComHashComments: boolean;
  // comTopTools: MigratableComToolName[];
  isMiniAnchor: boolean;
  playerHideMode: PlayerHideMode;
  isMetronomeHide: boolean;
  translationScreenConfigs: CmTranslationScreenConfig[];
  metronomeAccentes: string;
  metronomeMainSound: `${number}`;
  metronomeSecondarySound: `${number}`;
  eventContext: number[];
  favoriteMeetings: FavoriteMeetings;

  speedRollKf: number;
}

export type PlayerHideMode = 'expand' | 'min' | '';

export interface CmStorage extends CmState {
  settings: IExportableSetts;
  executions: ClientExecutionDict[];
}

export interface CmNavData {
  selectedComws: number[];
  ccomw: number;
  ccatw: number;
  eventw: number;
}
