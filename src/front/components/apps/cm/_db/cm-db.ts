import { DexieDB } from 'front/complect/_DexieDB';
import { IExportableCat, IExportableCom } from 'shared/api';

interface Storage {
  coms: IExportableCom[];
  cats: IExportableCat[];
}

class CmIDB extends DexieDB<Storage> {
  constructor() {
    super(true, 'cm', {
      coms: {
        w: '++',
      },
      cats: {
        w: '++',
      },
    });
  }
}

export const cmIDB = new CmIDB();
