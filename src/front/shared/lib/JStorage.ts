import { Eventer, EventerValueListeners } from 'shared/utils';

export type JStorageListener<Val> = (val: Val) => void;
const onUpdates: EventerValueListeners<0> = new Set();

const idb = indexedDB.open('jesmyl', 662);
idb.onupgradeneeded = () => Eventer.invokeValue(onUpdates, 0);

export const lsJStorageLSSwitcherName = 'isStorageNeedUseLocalStorage';

export class JStorage<Scope> {
  private listens: Partial<Record<keyof Scope, EventerValueListeners<Scope[keyof Scope]>>> = {};

  transaction: (mode: IDBTransactionMode) => IDBObjectStore;
  readyState: () => IDBRequestReadyState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<keyof Scope, any> = {} as never;

  constructor(name: string) {
    Eventer.listenValue(onUpdates, () => {
      const db = idb.result;
      if (!db.objectStoreNames.contains(name)) {
        db.createObjectStore(name);
      }
    });

    this.transaction = mode => idb.result.transaction(name, mode).objectStore(name);
    this.readyState = () => idb.readyState;

    if (localStorage[lsJStorageLSSwitcherName]) {
      this.get = key => {
        try {
          const str = localStorage.getItem(`[${name}]:${key as never}`);
          if (str === null) return;
          return JSON.parse(str);
        } catch (_error) {
          //
        }
      };

      this.setValue = (key, value) => {
        try {
          localStorage.setItem(`[${name}]:${key as never}`, JSON.stringify(value));
        } catch (_error) {
          //
        }
      };

      this.rem = key => {
        try {
          localStorage.removeItem(`[${name}]:${key as never}`);
        } catch (_error) {
          //
        }
      };
    }
  }

  refreshAreas<Key extends keyof Scope>(areas: Key[], contents: Record<Key, unknown>) {
    areas.forEach(key => {
      const val = contents[key] as NonUndefined<Scope[Key]>;
      if (val !== undefined) {
        this.set(key, val);
      }
    });
  }

  get<Key extends keyof Scope>(key: Key): Promise<Scope[Key] | undefined> {
    let tries = 100;

    const read = () => {
      const { promise, resolve } = Promise.withResolvers<Scope[Key] | undefined>();

      if (this.readyState() !== 'done') {
        if (tries-- > 0) setTimeout(async () => resolve(read()));
        return promise;
      }
      try {
        const data = this.transaction('readonly').get(key as string);
        data.onsuccess = () => resolve(data.result);
      } catch (_error) {
        resolve(undefined);
      }

      return promise;
    };

    return read();
  }

  async getOr<Key extends keyof Scope>(key: Key, def: Scope[Key]) {
    return ((await this.get(key)) ?? def) as Promise<NonUndefined<Scope[Key]>>;
  }

  on<Key extends keyof Scope, Value extends Scope[Key], InitialValue>(
    key: Key,
    callback: (value: Value) => void,
    initialValue: InitialValue,
  ) {
    if (this.properties[key] === undefined) this.properties[key] = initialValue;
    if (this.listens[key] === undefined) this.listens[key] = new Set();

    setTimeout(async () => {
      const val = (await this.get(key)) as Value | und;
      if (val === undefined) return;
      callback(val);
      this.properties[key] = val;
    });

    return Eventer.listenValue(this.listens[key]!, callback as never);
  }

  setValue<Key extends keyof Scope>(key: Key, val: Scope[Key]): void {
    const set = () => {
      if (this.readyState() !== 'done') {
        setTimeout(set);
        return;
      }

      try {
        this.transaction('readwrite').put(val, key as string);
      } catch (_error) {
        //
      }
    };

    set();
  }

  set<Key extends keyof Scope>(key: Key, val: Scope[Key] | ((prevValue: Scope[Key]) => Scope[Key])): void {
    if (val === null) {
      this.rem(key);

      if (this.properties[key] === val) return;
      if (this.listens[key] !== undefined) Eventer.invokeValue(this.listens[key]!, val as never);
      this.properties[key] = val;

      return;
    }
    const value = typeof val === 'function' ? (val as <V>(v: V) => V)(this.properties[key]) : val;

    if (this.properties[key] === value) return;
    if (this.listens[key] !== undefined) Eventer.invokeValue(this.listens[key]!, value);
    this.properties[key] = value;

    this.setValue(key, value);
  }

  rem(key: keyof Scope) {
    if (this.readyState() !== 'done') {
      setTimeout(() => this.rem(key));
      return;
    }
    try {
      this.transaction('readwrite').delete(key as string);
    } catch (_error) {
      //
    }
  }
}
