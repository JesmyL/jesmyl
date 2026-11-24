import { ScheduleWidgetWid } from 'shared/api/complect/schedule-widget';
import { SokiAuthLogin } from 'shared/api/complect/soki.model';
import { IndexSchWBroadcastLiveDataValue, RemoteBroadcastOs } from 'shared/model/index/Index.model';

export type SchLiveTsjrpcModel = {
  next: (args: { schw: ScheduleWidgetWid | null; data: IndexSchWBroadcastLiveDataValue }) => void;
  reset: (args: { schw: ScheduleWidgetWid }) => void;
  requestStreamers: (args: { schw: ScheduleWidgetWid }) => void;
  watch: (args: { schw: ScheduleWidgetWid; streamerLogin: SokiAuthLogin }) => void;
  unwatch: (args: { schw: ScheduleWidgetWid; streamerLogin: SokiAuthLogin }) => void;
  publishRemoteControl_1: (args: {
    ip: string;
    port: number;
    url?: string;
    deviceEmoji: string;
    agent: string;
    os: RemoteBroadcastOs;
    secretCode?: string;
  }) => void;
  unpublishRemoteControl_1: () => void;
  requestPublishedRemoteControls_1: () => { fio: string; ip: string; port: number; secretCode?: string }[];
  requestPublishedRemoteControls_2: (args: { schw: ScheduleWidgetWid | nil }) => {
    fio: string;
    ip: string;
    port: number;
    secretCode?: string;
    isConnectable: boolean;
  }[];
};

export type SchLiveTsjrpcSharesModel = {
  updateData: (args: { data: IndexSchWBroadcastLiveDataValue | null }) => void;
  streamersList: (args: { streamers: { fio: string; login: SokiAuthLogin }[] }) => void;
  publishedRemoteControlsList: (args: {
    controls: { fio: string; ip: string; port: number; secretCode?: string; isConnectable: boolean }[];
  }) => void;
};
