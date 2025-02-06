import { CmComWid, ScheduleComPackHistoryItem } from 'shared/api/complect/apps';
import { IScheduleWidgetDayEventMi, IScheduleWidgetWid } from 'shared/api/complect/schedule-widget';

export type CmComExternalsSokiInvocatorModel = {
  setInScheduleEvent: (
    schw: IScheduleWidgetWid,
    dayi: number,
    eventMi: IScheduleWidgetDayEventMi,
    list: CmComWid[],
    fio: string,
  ) => void;

  getScheduleEventHistory: (schw: IScheduleWidgetWid, dayi: number) => ScheduleComPackHistoryItem[];

  removeScheduleEventHistoryItem: (
    schw: IScheduleWidgetWid,
    dayi: number,
    writedAt: number,
  ) => ScheduleComPackHistoryItem[];
};
