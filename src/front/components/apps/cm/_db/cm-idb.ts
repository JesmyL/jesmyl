import { DexieDB } from 'front/complect/_DexieDB';
import { CmComWid, ICmComComment, IExportableCat, IExportableCom, MigratableComToolName } from 'shared/api';
import { EeStorePack } from 'shared/api/complect/apps/cm/complect/ee-store';
import { ChordPack } from '../../../../../shared/api/complect/apps/cm/complect/chord-card';

interface Storage {
  chordPack: ChordPack;
  eeStore: EeStorePack;
  favoriteComs: CmComWid[];
  comTopTools: MigratableComToolName[];

  lastModified: number;

  comComments: ICmComComment[];
  coms: IExportableCom[];
  cats: IExportableCat[];
}

class CmIDB extends DexieDB<Storage> {
  constructor() {
    super('cm', {
      chordPack: { $byDefault: {} },
      lastModified: { $byDefault: 0 },
      eeStore: { $byDefault: {} },
      favoriteComs: { $byDefault: [] },
      comTopTools: { $byDefault: ['mark-com', 'fullscreen-mode', 'chords-variant'] as never },

      coms: {
        w: '++',
        isRemoved: true,
      },
      cats: {
        w: '++',
        isRemoved: true,
      },
      comComments: {
        comw: '++',
      },
    });
  }
}

export const cmIDB = new CmIDB();
