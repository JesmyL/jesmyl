import { AppName } from 'front/app/App.model';
import { DexieDB } from 'front/complect/_DexieDB';
import { DeviceId, IScheduleWidget, LocalSokiAuth, ScheduleWidgetPhotoKey } from 'shared/api';
import { IndexValues } from '../Index.model';
import { FileAssociations } from '../parts/actions/files/complect/MyFilesTypeBox';

interface Storage {
  lastModified: number;
  auth: LocalSokiAuth;
  values: IndexValues;
  appFontFamily: string | null;
  dviceId: DeviceId;

  currentApp: AppName;
  appVersion: number;
  fileAssociations?: FileAssociations;

  schs: IScheduleWidget[];
  schedulePhotos: { key: ScheduleWidgetPhotoKey; src: string }[];
}

class IndexIDB extends DexieDB<Storage> {
  constructor() {
    super(true, 'index', {
      lastModified: true,
      auth: true,
      values: true,
      appFontFamily: true,
      appVersion: true,
      currentApp: true,
      fileAssociations: true,
      dviceId: true,

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
