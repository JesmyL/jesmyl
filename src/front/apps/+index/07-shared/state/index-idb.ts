import { AppName } from '#basis/model/App.model';
import { DexieDB } from '#shared/lib/DexieDB';
import { IndexMyFilesTypeBoxAssociations } from '$index/entities/MyFilesTypeBox';
import { DeviceId, IScheduleWidget, IScheduleWidgetWid, ScheduleWidgetPhotoKey } from 'shared/api';
import { StameskaIconPack } from 'stameska-icon/utils';

interface Storage {
  lastModifiedAt: number;
  appFontFamily: string | null;
  deviceId: DeviceId | null;

  currentApp: AppName;
  fileAssociations?: IndexMyFilesTypeBoxAssociations;

  schs: IScheduleWidget[];
  lastScheduleWid: IScheduleWidgetWid | NaN;
  schedulePhotos: { key: ScheduleWidgetPhotoKey; src: string }[];
  iconPacks: { key: KnownStameskaIconName; pack: StameskaIconPack }[];
}

class IndexIDB extends DexieDB<Storage> {
  constructor() {
    super('index', {
      lastModifiedAt: { $byDefault: 0 },
      appFontFamily: { $byDefault: null },
      currentApp: { $byDefault: 'cm' },
      fileAssociations: { $byDefault: {} as never },
      deviceId: { $byDefault: null },
      lastScheduleWid: { $byDefault: NaN },

      schs: {
        w: '++',
        isRemoved: true,
      },
      schedulePhotos: {
        key: '++',
      },
      iconPacks: {
        key: '++',
      },
    });
  }
}

export const indexIDB = new IndexIDB();
