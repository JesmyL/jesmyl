import { DexieDB } from '#shared/lib/DexieDB';
import { EeStorePack } from 'shared/api';

export interface CmEditorIDBStorage {
  lastModifiedAt: number;

  eeStore: EeStorePack;
  ignoredEESet: Set<string>;
}

class CmEditorIDB extends DexieDB<CmEditorIDBStorage> {
  constructor() {
    super('cm+editor', {
      lastModifiedAt: { $byDefault: 0 },
      eeStore: { $byDefault: {} },
      ignoredEESet: { $byDefault: new Set() },
    });
  }
}

export const cmEditorIDB = new CmEditorIDB();
