import { DexieDB } from 'front/complect/_DexieDB';
import { IExportableCat, IExportableCom } from 'shared/api';
import { ChordPack } from '../col/com/chord-card/ChordCard.model';

interface Storage {
  chordPack: ChordPack;

  comLastModified: number;
  catLastModified: number;
  chordPackLastModified: number;

  coms: IExportableCom[];
  cats: IExportableCat[];
}

class CmIDB extends DexieDB<Storage> {
  constructor() {
    super(true, 'cm', {
      chordPack: true,

      comLastModified: true,
      catLastModified: true,
      chordPackLastModified: true,

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
