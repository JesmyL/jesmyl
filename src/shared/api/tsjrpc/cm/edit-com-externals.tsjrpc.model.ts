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
  setInSchEv: (args: {
    schw: IScheduleWidgetWid;
    dayi: number;
    eventMi: IScheduleWidgetDayEventMi;
    list: CmComWid[];
    fio: string;
  }) => void;

  /** ord visibility interpretation */
  ordVisIntp: (args: { schw: IScheduleWidgetWid; comw: CmComWid; ordw: CmComOrderWid; isInv: boolean }) => void;

  /** com transposition interpretation */
  tonIntp: (args: { schw: IScheduleWidgetWid; comw: CmComWid; ton: number }) => void;
  /** is bemoled interpretation value */
  bemoleIntp: (args: { schw: IScheduleWidgetWid; comw: CmComWid; val: num }) => void;
  /** com bpm interpretation */
  bpmIntp: (args: { schw: IScheduleWidgetWid; comw: CmComWid; bpm: number }) => void;

  getSchEvHistory: (args: { schw: IScheduleWidgetWid; dayi: number }) => ScheduleComPackHistoryItem[];
  getSchEvHistoryStatistic: (args: { schw: IScheduleWidgetWid; dayi: number }) => {
    comwCount: Record<CmComWid, number>;
    totalCount: number;
  };

  removeSchEvHistoryItem: (args: {
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
