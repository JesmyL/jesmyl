import { DexieDB } from '#shared/lib/DexieDB';

export interface CmEditorIDBStorage {
  ignoredEESet: Set<string>;
}

class CmEditorIDB extends DexieDB<CmEditorIDBStorage> {
  constructor() {
    super('cm+editor', {
      ignoredEESet: [new Set()],
    });
  }
}

export const cmEditorIDB = new CmEditorIDB();
