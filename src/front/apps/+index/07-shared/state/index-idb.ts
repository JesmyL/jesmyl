import { AppName } from '#basis/model/App.model';
import { DexieDB } from '#shared/lib/DexieDB';
import { soki } from '#shared/soki';
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
      lastModifiedAt: [0],
      appFontFamily: [null],
      currentApp: ['cm'],
      fileAssociations: [{} as never],
      deviceId: [null],
      lastScheduleWid: [NaN],

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

soki.onAuthorizeEvent.listen(async () => {
  await indexIDB.remove.lastModifiedAt();
});
