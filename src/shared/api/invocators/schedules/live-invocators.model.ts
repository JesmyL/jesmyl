import { IndexSchWTranslationLiveDataValue } from 'front/components/index/Index.model';
import { IScheduleWidgetWid } from 'shared/api/complect/schedule-widget';
import { SokiAuthLogin } from 'shared/api/complect/soki.model';

export type SchLiveSokiInvocatorModel = {
  next: (args: { schw: IScheduleWidgetWid; data: IndexSchWTranslationLiveDataValue }) => void;
  reset: (args: { schw: IScheduleWidgetWid }) => void;
  requestStreamers: (args: { schw: IScheduleWidgetWid }) => void;
  watch: (args: { schw: IScheduleWidgetWid; streamerLogin: SokiAuthLogin }) => void;
  unwatch: (args: { schw: IScheduleWidgetWid; streamerLogin: SokiAuthLogin }) => void;
};

export type SchLiveSokiInvocatorSharesModel = {
  updateData: (args: { data: IndexSchWTranslationLiveDataValue | null }) => void;
  streamersList: (args: { streamers: { fio: string; login: SokiAuthLogin }[] }) => void;
};
