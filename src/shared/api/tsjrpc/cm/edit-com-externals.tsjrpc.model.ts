import {
  CmComAudioMarkEditPack,
  CmComAudioMarkEditPackValue,
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComInSchDayEvWr,
  CmComOrderWid,
  CmComWid,
  HttpNumLeadLink,
  ScheduleComPackHistoryItem,
} from 'shared/api/complect/apps';
import { ScheduleWidgetDayEventMi, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api/complect/schedule-widget';
import { TonType } from 'shared/const/cm/enums';

export type CmEditComExternalsTsjrpcModel = {
  addComwsInSchEvHistory: (args: {
    schw: ScheduleWidgetWid;
    dayi: ScheduleWidgetDayi;
    eventMi: ScheduleWidgetDayEventMi;
    comws: CmComWid[];
  }) => void;

  /** ord visibility interpretation */
  ordVisIntp: (args: { schw: ScheduleWidgetWid; comw: CmComWid; ordw: CmComOrderWid }) => void;

  ordMdSwitchIntp: (args: { schw: ScheduleWidgetWid; comw: CmComWid; ordw: CmComOrderWid }) => void;
  ordMudlIntp: (args: { schw: ScheduleWidgetWid; comw: CmComWid; ordw: CmComOrderWid; md: number }) => void;

  /** com transposition interpretation */
  tonIntp: (args: { schw: ScheduleWidgetWid; comw: CmComWid; ton: number }) => void;
  /** is bemoled interpretation value */
  bemoleIntp: (args: { schw: ScheduleWidgetWid; comw: CmComWid; val: TonType }) => void;
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

  updateAudioMarks_v2: (
    args: {
      comw: CmComWid;
    } & (
      | {
          src: HttpNumLeadLink;
          time: CmComAudioMarkPackTime;
          sel: CmComAudioMarkEditPackValue;
        }
      | {
          marks: CmComAudioMarkEditPack[CmComWid];
        }
    ),
  ) => {
    comw: CmComWid;
    marks?: CmComAudioMarkPack | nil;
  };

  changeAudioMarkTime_v1: (args: {
    src: HttpNumLeadLink;
    time: CmComAudioMarkPackTime;
    newTime: CmComAudioMarkPackTime;
    comw: CmComWid;
  }) => null | {
    comw: CmComWid;
    marks?: CmComAudioMarkPack | nil;
  };

  switchComwRefs: (args: { comw: CmComWid; withComw: CmComWid }) => void;
};
