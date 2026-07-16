import {
  CmComAudioMarkEditPack,
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComInSchDayEvWr,
  CmComOrderWid,
  CmComWid,
  HttpNumLeadLink,
  ScheduleComPackHistoryItem,
} from 'shared/api/complect/apps';
import { ScheduleWidgetDayEventMi, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api/complect/schedule-widget';

export type CmEditComExternalsTsjrpcModel = {
  addComwsInSchEvHistory: (args: {
    schw: ScheduleWidgetWid;
    dayi: ScheduleWidgetDayi;
    eventMi: ScheduleWidgetDayEventMi;
    comws: CmComWid[];
  }) => void;

  /** ord visibility interpretation */
  ordVisIntp: (args: { schw: ScheduleWidgetWid; comw: CmComWid; ordw: CmComOrderWid }) => void;

  /** com transposition interpretation */
  tonIntp: (args: { schw: ScheduleWidgetWid; comw: CmComWid; ton: number }) => void;
  /** is bemoled interpretation value */
  bemoleIntp: (args: { schw: ScheduleWidgetWid; comw: CmComWid; val: Bool }) => void;
  /** com bpm interpretation */
  bpmIntp: (args: { schw: ScheduleWidgetWid; comw: CmComWid; bpm: number }) => void;

  getSchEvHistory: (args: { schw: ScheduleWidgetWid; dayi: ScheduleWidgetDayi }) => ScheduleComPackHistoryItem[];
  getSchEvHistoryStatistic: (args: { schw: ScheduleWidgetWid; dayi: ScheduleWidgetDayi }) => {
    comwCount: Record<SKey<CmComWid>, number>;
    totalCount: number;
  };

  removeSchEvHistoryItem: (args: {
    schw: ScheduleWidgetWid;
    dayi: ScheduleWidgetDayi;
    writedAt: CmComInSchDayEvWr;
  }) => { w: CmComInSchDayEvWr };

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
