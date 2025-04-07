import { FileStore } from 'back/complect/FileStore';
import {
  CmComWid,
  IExportableCat,
  IExportableCom,
  IScheduleWidgetWid,
  ScheduleComPack,
  ScheduleComPackHistory,
} from 'shared/api';

export const comsFileStore = new FileStore<IExportableCom[]>('/apps/cm/coms.json', []);
export const catsFileStore = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

export const eventPacksFileStore = new FileStore(
  '/apps/cm/schEventPacks.json',
  {} as Record<IScheduleWidgetWid, ScheduleComPack>,
);
export const eventPackHistoryFileStore = new FileStore<ScheduleComPackHistory>('/apps/cm/schEventPackHistory.json', {});

export const comwVisitsFileStore = new FileStore<PRecord<CmComWid, number>>('/apps/cm/comwVisits.json', {});
