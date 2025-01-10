import { DexieDB } from 'front/complect/_DexieDB';
import { IExportableCat, IExportableCom } from 'shared/api';

interface Storage {
  comLastModified: number;
  catLastModified: number;
  coms: IExportableCom[];
  cats: IExportableCat[];
}

class CmIDB extends DexieDB<Storage> {
  constructor() {
    super(true, 'cm', {
      comLastModified: 0,
      catLastModified: 1,
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
