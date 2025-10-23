import { ReactNode } from 'react';
import { IScheduleWidget } from 'shared/api';

export type CmRollMode = 'pause' | 'play' | null;

export enum ChordVisibleVariant {
  None = 0,
  Minimal = 1,
  Maximal = 2,
}

export interface LiveBroadcastAppProps {
  isCantTranslateLive: boolean;
  fio: string;
  headTitle: ReactNode;
  schedule: IScheduleWidget;
}
