import { cmIDB } from '@cm/shared/lib/cmIdb';
import { EeStorePack } from 'shared/api';

export class EeStorage {
  store?: EeStorePack;

  constructor() {
    this.load();
  }

  async load() {
    if (this.store != null) return this.store;
    return (this.store = await cmIDB.get.eeStore());
  }

  save() {
    cmIDB.set.eeStore(this.store || {});
  }

  get(word: string) {
    return this.store !== undefined ? this.store[word] : -1;
  }

  set(word: string, value: number | number[]) {
    if (this.store) this.store[word] = value;
  }
}

export const eeStorage = new EeStorage();
