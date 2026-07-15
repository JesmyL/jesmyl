import { ScheduleWidgetDayEventMi, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api/complect/schedule-widget';
import { IExportableComInterpretation } from './basic';
import { CmComInSchDayEvWr, CmComWid } from './enums';

export type ScheduleComPackEventPath = `${number}/${ScheduleWidgetDayEventMi}`;

export type ScheduleComPackHistoryItem = {
  w: CmComInSchDayEvWr;
  s: CmComWid[];
  e: ScheduleWidgetDayEventMi;
  d: ScheduleWidgetDayi;
  fio: string;
};

export type ComsInScheduleIntp = {
  schw: ScheduleWidgetWid;
  /** специальная интерпритация для мероприятия */
  intp?: PRecord<CmComWid, IExportableComInterpretation>;
};

export type ComsInSchEventComwsPack = {
  schw: ScheduleWidgetWid;
  pack: PRecord<ScheduleWidgetDayi, PRecord<ScheduleWidgetDayEventMi, { s: CmComWid[]; fio: string; w: number }>>;
};

export type ScheduleComPackHistory = PRecord<
  ScheduleWidgetWid,
  PRecord<ScheduleWidgetDayi, ScheduleComPackHistoryItem[]>
>;

export type ComsInSchEventHistory = {
  schw: ScheduleWidgetWid;
  d: PRecord<ScheduleWidgetDayi, ScheduleComPackHistoryItem[]>;
};
