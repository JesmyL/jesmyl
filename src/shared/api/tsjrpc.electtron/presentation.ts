import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { ScheduleWidgetWid } from '../complect/schedule-widget';

export type ElectronPresentationTsjrpcModel = {
  close: () => void;
  show: (args: { schw: ScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue }) => void;
  liveData: (args: { schw: ScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue }) => void;
};
