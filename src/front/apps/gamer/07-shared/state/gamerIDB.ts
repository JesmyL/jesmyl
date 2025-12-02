import { DexieDB } from '#shared/lib/DexieDB';
import { GamerMemoryGiantImage } from '../model/memory-giant';

type GamerStorage = {
  memoryGiantImages: GamerMemoryGiantImage[];
};

export const gamerIDB = new (class GamerIDB extends DexieDB<GamerStorage> {
  constructor() {
    super('gamer', {
      memoryGiantImages: { md5: '++' },
    });
  }
})();
