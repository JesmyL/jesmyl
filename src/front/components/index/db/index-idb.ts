import { AppName } from '#basis/model/App.model';
import { DexieDB } from '#shared/lib/DexieDB';
import { DeviceId, IScheduleWidget, IScheduleWidgetWid, ScheduleWidgetPhotoKey } from 'shared/api';
import { FileAssociations } from '../parts/actions/files/complect/MyFilesTypeBox';

interface Storage {
  lastModifiedAt: number;
  appFontFamily: string | null;
  deviceId: DeviceId;

  currentApp: AppName;
  fileAssociations?: FileAssociations;

  schs: IScheduleWidget[];
  lastScheduleWid: IScheduleWidgetWid | NaN;
  schedulePhotos: { key: ScheduleWidgetPhotoKey; src: string }[];
}

class IndexIDB extends DexieDB<Storage> {
  constructor() {
    super('index', {
      lastModifiedAt: { $byDefault: 0 },
      appFontFamily: { $byDefault: null },
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
