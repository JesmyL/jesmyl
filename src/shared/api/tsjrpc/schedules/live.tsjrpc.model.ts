import { ScheduleWidgetWid } from 'shared/api/complect/schedule-widget';
import { SokiAuthLogin } from 'shared/api/complect/soki.model';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

export type SchLiveTsjrpcModel = {
  next: (args: { schw: ScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue }) => void;
  reset: (args: { schw: ScheduleWidgetWid }) => void;
  requestStreamers: (args: { schw: ScheduleWidgetWid }) => void;
  watch: (args: { schw: ScheduleWidgetWid; streamerLogin: SokiAuthLogin }) => void;
  unwatch: (args: { schw: ScheduleWidgetWid; streamerLogin: SokiAuthLogin }) => void;
};

export type SchLiveTsjrpcSharesModel = {
  updateData: (args: { data: IndexSchWBroadcastLiveDataValue | null }) => void;
  streamersList: (args: { streamers: { fio: string; login: SokiAuthLogin }[] }) => void;
};
