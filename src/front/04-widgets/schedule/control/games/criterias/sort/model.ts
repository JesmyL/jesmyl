import { IScheduleWidgetUser } from 'shared/api';

export type HistoryAdder = (
  start: number,
  end: number,
  users: IScheduleWidgetUser[],
  correct: 'left' | 'right',
) => void;
