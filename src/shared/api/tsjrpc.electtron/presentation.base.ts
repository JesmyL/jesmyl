import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { ScheduleWidgetWid } from '../complect/schedule-widget';

export type ElectronPresentationBaseTsjrpcModel = {
  liveData: (liveData: { schw: ScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue }) => void;
};
