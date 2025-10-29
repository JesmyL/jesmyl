import { DexieDB } from '#shared/lib/DexieDB';
import { StoragesRack } from 'shared/model/storages/list.model';

export interface CmIDBStorage {
  lastModifiedAt: number;

  racks: StoragesRack[];
}

class StoragesIDB extends DexieDB<CmIDBStorage> {
  constructor() {
    super('storages', {
      lastModifiedAt: { $byDefault: 0 },

      racks: { w: '++' },
    });
  }
}

export const storagesIDB = new StoragesIDB();
