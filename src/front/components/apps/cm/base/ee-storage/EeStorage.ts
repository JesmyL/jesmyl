import cmStorage from '../../cmStorage';
import { EeStorageStoreType } from './EeStorage.model';

export class EeStorage {
  store?: EeStorageStoreType;

  constructor() {
    this.load();
  }

  async load() {
    if (this.store != null) return this.store;
    return (this.store = await cmStorage.getOr('eeStorage', {}));
  }

  save() {
    cmStorage.set('eeStorage', this.store || {});
  }

  get(word: string) {
    return this.store !== undefined ? this.store[word] : -1;
  }

  set(word: string, value: number | number[]) {
    if (this.store) this.store[word] = value;
  }
}

export const eeStorage = new EeStorage();
