import { IScheduleWidgetDayEventMi, IScheduleWidgetWid } from 'shared/api/complect/schedule-widget';
import { CmComWid } from './enums';

export type ScheduleComPackEventPath = `${number}/${IScheduleWidgetDayEventMi}`;

export type ScheduleComPackHistoryItem = {
  w: number | num;
  s: CmComWid[];
  e: IScheduleWidgetDayEventMi;
  fio: string;
};

export type ComsInSchEvent = {
  schw: IScheduleWidgetWid;
  pack: PRecord<number, PRecord<IScheduleWidgetDayEventMi, CmComWid[]>>;
};

export type ScheduleComPackHistory = PRecord<IScheduleWidgetWid, PRecord<number, ScheduleComPackHistoryItem[]>>;

export type ComsInSchEventHistory = { schw: IScheduleWidgetWid; d: PRecord<number, ScheduleComPackHistoryItem[]> };
