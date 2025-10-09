import {
  CmComAudioMarkEditPack,
  CmComAudioMarkPack,
  CmComWid,
  HttpLink,
  ScheduleComPackHistoryItem,
} from 'shared/api/complect/apps';
import { IScheduleWidgetDayEventMi, IScheduleWidgetWid } from 'shared/api/complect/schedule-widget';

export type CmEditComExternalsTsjrpcModel = {
  setInScheduleEvent: (args: {
    schw: IScheduleWidgetWid;
    dayi: number;
    eventMi: IScheduleWidgetDayEventMi;
    list: CmComWid[];
    fio: string;
  }) => void;

  getScheduleEventHistory: (args: { schw: IScheduleWidgetWid; dayi: number }) => ScheduleComPackHistoryItem[];
  getScheduleEventHistoryStatistic: (args: { schw: IScheduleWidgetWid; dayi: number }) => {
    comwCount: Record<CmComWid, number>;
    totalCount: number;
  };

  removeScheduleEventHistoryItem: (args: {
    schw: IScheduleWidgetWid;
    dayi: number;
    writedAt: number;
  }) => ScheduleComPackHistoryItem[];

  updateAudioMarks: (args: { src: HttpLink; marks: CmComAudioMarkEditPack }) => {
    src: HttpLink;
    marks?: CmComAudioMarkPack;
  };
};
