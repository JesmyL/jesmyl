import { ClientExecutionDict } from '../../../complect/exer/Exer.model';
import { IExportableSetts } from './col/com/block-styles/BlockStyles.model';

export type CmRollMode = 'pause' | 'play' | null;

export enum ChordVisibleVariant {
  None = 0,
  Minimal = 1,
  Maximal = 2,
}

export type FavoriteMeetings = Record<'events' | 'contexts', number[]>;
export interface CmState {}

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
