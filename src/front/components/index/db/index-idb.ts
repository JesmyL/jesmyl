import { DexieDB } from 'front/complect/_DexieDB';
import { IScheduleWidget, ScheduleWidgetPhotoKey } from 'shared/api';

interface Storage {
  lastModified: number;

  schs: IScheduleWidget[];
  schedulePhotos: { key: ScheduleWidgetPhotoKey; src: string }[];
}

class IndexIDB extends DexieDB<Storage> {
  constructor() {
    super(true, 'index', {
      lastModified: true,

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
