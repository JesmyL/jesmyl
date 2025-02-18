import { DexieDB } from 'front/08-shared/lib/_DexieDB';
import { DeviceId } from 'shared/api';
import { IndexIDBStore } from './model';

class IndexIDB extends DexieDB<IndexIDBStore> {
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
