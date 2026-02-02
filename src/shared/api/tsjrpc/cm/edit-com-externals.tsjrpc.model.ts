import {
  CmComAudioMarkEditPack,
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComOrderWid,
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

  switchComOrdVisiblityInterpretation: (args: {
    schw: IScheduleWidgetWid;
    comw: CmComWid;
    ordw: CmComOrderWid;
    isOrdInvisible: boolean;
  }) => void;

  setComTonInterpretation: (args: { schw: IScheduleWidgetWid; comw: CmComWid; ton: number }) => void;

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

  updateAudioMarks: (args: { src: HttpLink; cMarks: CmComAudioMarkEditPack }) => {
    src: HttpLink;
    cMarks?: CmComAudioMarkPack;
  };

  changeAudioMarkTime: (args: {
    src: HttpLink;
    time: CmComAudioMarkPackTime;
    newTime: CmComAudioMarkPackTime;
    comw: CmComWid;
  }) => null | {
    src: HttpLink;
    cMarks?: CmComAudioMarkPack;
  };
};
