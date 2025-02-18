import { AppName } from '#basis/model/App.model';
import { FileAssociations } from '#pages/index/actions/files/complect/MyFilesTypeBox';
import { DeviceId, IndexValues, IScheduleWidget, IScheduleWidgetWid, ScheduleWidgetPhotoKey } from 'shared/api';

export interface IndexIDBStore {
  lastModifiedAt: number;
  values: IndexValues;
  appFontFamily: string | null;
  deviceId: DeviceId;

  currentApp: AppName;
  appVersion: number;
  fileAssociations?: FileAssociations;

  schs: IScheduleWidget[];
  lastScheduleWid: IScheduleWidgetWid | NaN;
  schedulePhotos: { key: ScheduleWidgetPhotoKey; src: string }[];
}
