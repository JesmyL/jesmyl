import Dexie, { EntityTable } from 'dexie';
import { SMyLib, smylib } from '../../shared/utils';

const keyvalues = '%keyvalues%';

export class DexieDB<Store> {
  db: Dexie &
    Required<{
      [K in keyof Store]: Store[K] extends any[]
        ? EntityTable<Store[K][number], keyof Store[K][number]>
        : EntityTable<Store[K], keyof Store[K]>;
    }>;

  private tryIsSimpleValue: <Key extends keyof Store>(key: Key) => void;

  constructor(
    isDev: boolean,
    storageName: string,
    defaults: Required<{
      [K in keyof Store]: Store[K] extends any[]
        ? keyof Store[K][number] extends string
          ? Partial<Record<'_', '++'> & Record<keyof Store[K][number], true | '++'>>
          : never
        : number;
    }>,
    version = 1,
  ) {
    if (isDev) {
      const uniqueIndexKeyMap = new Map<number, string>();

      SMyLib.keys(defaults).forEach(key => {
        if (!smylib.isNum(defaults[key])) return;
        const prevKey = uniqueIndexKeyMap.get(defaults[key]);
        if (prevKey !== undefined) throw new Error(`"${key as never}" and "${prevKey}" has same key ${defaults[key]}`);
        uniqueIndexKeyMap.set(defaults[key], key as never);
      });

      this.tryIsSimpleValue = key => {
        if (smylib.isNum(defaults[key])) return;
        throw new Error(`${key as never} is not simple object value`);
      };
    } else this.tryIsSimpleValue = () => {};

    this.db = new Dexie(storageName) as never;

    const stores = {} as Record<string, string>;

    Object.keys(defaults).forEach(key => {
      if (smylib.isNum(defaults[key as never])) return;

      stores[key] = SMyLib.entries(defaults[key as never])
        .map(([key, val]) => `${val === '++' ? '++' : ''}${key as never}`)
        .join(', ');
    });

    stores[keyvalues] = '++key';

    this.db.version(version).stores(stores);
  }

  private getKeyvalues() {
    return this.db[keyvalues as never] as EntityTable<unknown>;
  }

  async getSingleValue<Key extends keyof Store>(key: Key) {
    this.tryIsSimpleValue(key);

    return ((await this.getKeyvalues().get({ key })) as any)!?.val;
  }

  async setSingleValue<Key extends keyof Store, Value extends Store[Key] extends any[] ? never : Store[Key]>(
    key: Key,
    value: Value | ((value: Value) => Value),
  ) {
    this.tryIsSimpleValue(key);

    if (smylib.isFunc(value)) {
      return await this.getKeyvalues().put({
        key,
        val: value((await this.getSingleValue(key)) as never),
      } as never);
    } else {
      return await this.getKeyvalues().put({ key, val: value } as never);
    }
  }

  async remSingleValue<Key extends keyof Store>(key: Key) {
    this.tryIsSimpleValue(key);
    return await this.getKeyvalues().where({ key }).delete();
  }
}
