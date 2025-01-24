import { ReactNode } from 'react';
import { IScheduleWidget } from 'shared/api';

export interface LiveTranslationAppProps {
  isCantTranslateLive: boolean;
  fio: string;
  headTitle: ReactNode;
  schedule: IScheduleWidget;
}
