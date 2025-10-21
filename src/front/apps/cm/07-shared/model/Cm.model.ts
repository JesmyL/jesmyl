import { ReactNode } from 'react';
import { IScheduleWidget } from 'shared/api';

export type CmRollMode = 'pause' | 'play' | null;

export enum ChordVisibleVariant {
  None = 0,
  Minimal = 1,
  Maximal = 2,
}

export type FavoriteMeetings = Record<'events' | 'contexts', number[]>;

export type PlayerHideMode = 'expand' | 'min' | '';

export interface LiveBroadcastAppProps {
  isCantTranslateLive: boolean;
  fio: string;
  headTitle: ReactNode;
  schedule: IScheduleWidget;
}
