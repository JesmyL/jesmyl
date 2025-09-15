import { AppName } from '#basis/model/App.model';
import { DexieDB } from '#shared/lib/DexieDB';
import { Atom } from 'atomaric';
import { DeviceId, IScheduleWidget, IScheduleWidgetWid, ScheduleWidgetPhotoKey } from 'shared/api';
import { StameskaIconPack } from 'stameska-icon/utils';
import { FileAssociations } from '../parts/actions/files/complect/MyFilesTypeBox';
import { indexDeviceIdAtom } from './atoms';

interface Storage {
  lastModifiedAt: number;
  appFontFamily: string | null;
  deviceId: DeviceId | null;

  currentApp: AppName;
  fileAssociations?: FileAssociations;

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

(async () => {
  const removeWithAtomSet = async <
    Key extends keyof typeof indexIDB.tb,
    Value extends Awaited<ReturnType<(typeof indexIDB.get)[Key]>>,
  >(
    key: Key,
    atom: Atom<Value>,
  ) => {
    const value = (await indexIDB.get[key]()) as Value;
    if (value == null) return;
    atom.set(value);
    indexIDB.remove[key]();
  };

  await removeWithAtomSet('deviceId', indexDeviceIdAtom);
})();
