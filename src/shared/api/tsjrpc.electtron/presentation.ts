import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { ScheduleWidgetWid } from '../complect/schedule-widget';

type LiveData = { schw: ScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue };

export type ElectronPresentationTsjrpcModel = {
  close: () => void;
  show: (args: LiveData) => void;
  liveData: (args: LiveData) => void;
};
