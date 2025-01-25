import { FileStore } from 'back/complect/FileStore';
import { IScheduleWidgetWid, ScheduleComPack, ScheduleComPackHistory } from 'shared/api';

export const eventPacksFileStore = new FileStore(
  '/apps/cm/schEventPacks',
  {} as Record<IScheduleWidgetWid, ScheduleComPack>,
);
export const eventPackHistoryFileStore = new FileStore<ScheduleComPackHistory>('/apps/cm/schEventPackHistory', {});
