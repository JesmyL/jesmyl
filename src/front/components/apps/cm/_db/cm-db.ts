import { DexieDB } from 'front/complect/_DexieDB';
import { IExportableCat, IExportableCom } from 'shared/api';
import { EeStorePack } from 'shared/api/complect/apps/cm/complect/ee-store';
import { ChordPack } from '../../../../../shared/api/complect/apps/cm/complect/chord-card';

interface Storage {
  chordPack: ChordPack;
  eeStore: EeStorePack;

  lastModified: number;

  coms: IExportableCom[];
  cats: IExportableCat[];
}

class CmIDB extends DexieDB<Storage> {
  constructor() {
    super(true, 'cm', {
      chordPack: true,
      lastModified: true,
      eeStore: true,

      coms: {
        w: '++',
        isRemoved: true,
      },
      cats: {
        w: '++',
        isRemoved: true,
      },
    });
  }
}

export const cmIDB = new CmIDB();
