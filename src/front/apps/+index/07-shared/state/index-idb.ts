import { DexieDB } from '#shared/lib/DexieDB';
import { soki } from '#shared/soki';
import { DeviceId, IScheduleWidget, IScheduleWidgetWid, ScheduleWidgetPhotoKey } from 'shared/api';
import { StameskaIconPack } from 'stameska-icon/utils';
import { MyFileBoxId } from 'x/my-files';

interface Storage {
  lastModifiedAt: number;
  appFontFamilyId: MyFileBoxId | null;
  deviceId: DeviceId | null;

  schs: IScheduleWidget[];
  lastScheduleWid: IScheduleWidgetWid | NaN;
  schedulePhotos: { key: ScheduleWidgetPhotoKey; src: string }[];
  iconPacks: { key: KnownStameskaIconName; pack: StameskaIconPack }[];
}

class IndexIDB extends DexieDB<Storage> {
  constructor() {
    super('index', {
      lastModifiedAt: [0],
      appFontFamilyId: [null],
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
