import {
  CmComAudioMarkEditPack,
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComOrderWid,
  CmComWid,
  HttpNumLeadLink,
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

  updateAudioMarks: (args: { src: HttpNumLeadLink; cMarks: CmComAudioMarkEditPack }) => {
    src: HttpNumLeadLink;
    cMarks?: CmComAudioMarkPack;
  };

  changeAudioMarkTime: (args: {
    src: HttpNumLeadLink;
    time: CmComAudioMarkPackTime;
    newTime: CmComAudioMarkPackTime;
    comw: CmComWid;
  }) => null | {
    src: HttpNumLeadLink;
    cMarks?: CmComAudioMarkPack;
  };

  switchComwRefs: (args: { comw: CmComWid; withComw: CmComWid }) => void;
};
