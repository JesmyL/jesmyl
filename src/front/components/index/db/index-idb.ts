import { DexieDB } from '#shared/lib/_DexieDB';
import { AppName } from 'front/app/App.model';
import { DeviceId, IndexValues, IScheduleWidget, IScheduleWidgetWid, ScheduleWidgetPhotoKey } from 'shared/api';
import { FileAssociations } from '../parts/actions/files/complect/MyFilesTypeBox';

interface Storage {
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

class IndexIDB extends DexieDB<Storage> {
  constructor() {
    super('index', {
      lastModifiedAt: { $byDefault: 0 },
      values: { $byDefault: {} },
      appFontFamily: { $byDefault: null },
      appVersion: { $byDefault: 0 },
      currentApp: { $byDefault: 'cm' },
      fileAssociations: { $byDefault: {} as never },
      deviceId: { $byDefault: DeviceId.def },
      lastScheduleWid: { $byDefault: NaN },

      schs: {
        w: '++',
        isRemoved: true,
      },
      schedulePhotos: {
        key: '++',
      },
    });
  }
}

export const indexIDB = new IndexIDB();
