import { IScheduleWidgetDayEventMi, IScheduleWidgetWid } from 'shared/api/complect/schedule-widget';
import { CmComWid } from './enums';

export type ScheduleComPackEventPath = `${number}/${IScheduleWidgetDayEventMi}`;

export type ScheduleComPackHistoryItem = {
  w: number | num;
  s: CmComWid[];
  e: IScheduleWidgetDayEventMi;
  fio: string;
};

export type ScheduleComPack = {
  schw: IScheduleWidgetWid;
  m: number;
  pack: PRecord<number, PRecord<IScheduleWidgetDayEventMi, CmComWid[]>>;
};

export type ScheduleComPackHistory = PRecord<IScheduleWidgetWid, PRecord<number, ScheduleComPackHistoryItem[]>>;
