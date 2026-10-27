import { ScheduleWidgetWid } from 'shared/api';
import { BroadcastLiveApp, IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

export type BroadcastScreenProps = {
  configi?: number;
  win: Window;
  isTech?: boolean;
  isPreview?: boolean;
  forceViewApp?: BroadcastViewApp;
};

export type BroadcastViewApp = BroadcastLiveApp;

export type BroadcastLiveData = {
  schw: ScheduleWidgetWid;
  data: IndexSchWBroadcastLiveDataValue;
};
