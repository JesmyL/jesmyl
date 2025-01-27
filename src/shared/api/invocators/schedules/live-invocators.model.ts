import { IndexSchWTranslationLiveDataValue } from 'front/components/index/Index.model';
import { IScheduleWidgetWid } from 'shared/api/complect/schedule-widget';
import { SokiAuthLogin } from 'shared/api/complect/soki.model';

export type SchLiveSokiInvocatorModel = {
  next: (schw: IScheduleWidgetWid, data: IndexSchWTranslationLiveDataValue) => void;
  reset: (schw: IScheduleWidgetWid) => void;
  requestStreamers: (schw: IScheduleWidgetWid) => void;
  watch: (schw: IScheduleWidgetWid, streamerLogin: SokiAuthLogin) => void;
  unwatch: (schw: IScheduleWidgetWid, streamerLogin: SokiAuthLogin) => void;
};

export type SchLiveSokiInvocatorSharesModel = {
  updateData: (data: IndexSchWTranslationLiveDataValue | null) => void;
  streamersList: (streamers: { fio: string; login: SokiAuthLogin }[]) => void;
};
