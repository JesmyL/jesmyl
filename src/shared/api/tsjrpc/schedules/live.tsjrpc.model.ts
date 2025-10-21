import { IndexSchWBroadcastLiveDataValue } from '$index/shared/model/Index.model';
import { IScheduleWidgetWid } from 'shared/api/complect/schedule-widget';
import { SokiAuthLogin } from 'shared/api/complect/soki.model';

export type SchLiveTsjrpcModel = {
  next: (args: { schw: IScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue }) => void;
  reset: (args: { schw: IScheduleWidgetWid }) => void;
  requestStreamers: (args: { schw: IScheduleWidgetWid }) => void;
  watch: (args: { schw: IScheduleWidgetWid; streamerLogin: SokiAuthLogin }) => void;
  unwatch: (args: { schw: IScheduleWidgetWid; streamerLogin: SokiAuthLogin }) => void;
};

export type SchLiveTsjrpcSharesModel = {
  updateData: (args: { data: IndexSchWBroadcastLiveDataValue | null }) => void;
  streamersList: (args: { streamers: { fio: string; login: SokiAuthLogin }[] }) => void;
};
