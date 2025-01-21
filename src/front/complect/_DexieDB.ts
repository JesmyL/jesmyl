import Dexie, { EntityTable } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { emptyArray, SMyLib, smylib } from '../../shared/utils';

const keyvalues = '%keyvalues%';

export class DexieDB<Store> {
  db: Dexie &
    Required<{
      [K in keyof Store]: Store[K] extends any[] ? EntityTable<Store[K][number], keyof Store[K][number]> : never;
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
        : true;
    }>,
    version = 1,
  ) {
    if (isDev) {
      this.tryIsSimpleValue = key => {
        if (defaults[key] === true) return;
        throw new Error(`${key as never} is not simple object value`);
      };
    } else this.tryIsSimpleValue = () => {};

    this.db = new Dexie(storageName) as never;

    const stores = {} as Record<string, string>;

    Object.keys(defaults).forEach(key => {
      if (defaults[key as never] === true) return;

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

  async getSingleValue<
    Key extends keyof Store,
    Value extends Store[Key] extends any[] ? never : Store[Key],
    DefaultValue extends Value | und,
  >(key: Key, defaultValue?: DefaultValue): Promise<Value | DefaultValue> {
    this.tryIsSimpleValue(key);
    const store = (await this.getKeyvalues().get({ key })) as any;

    if (store === undefined) return defaultValue as never;

    return store.val;
  }

  async setSingleValue<
    Key extends keyof Store,
    Value extends Store[Key] extends any[] ? never : Store[Key],
    DefaultValue extends Value | und,
  >(key: Key, value: Value | ((value: Value | DefaultValue) => Value), defaultValue?: DefaultValue) {
    this.tryIsSimpleValue(key);

    if (smylib.isFunc(value)) {
      return await this.getKeyvalues().put({
        key,
        val: value((await this.getSingleValue(key, defaultValue as never)) as never),
      } as never);
    } else {
      return await this.getKeyvalues().put({ key, val: value } as never);
    }
  }

  async remSingleValue<Key extends keyof Store>(key: Key) {
    this.tryIsSimpleValue(key);
    return await this.getKeyvalues().where({ key }).delete();
  }

  useSingleValueLiveQuery<Key extends keyof Store, Def extends Store[Key] | und>(
    key: Key,
    def?: Def,
  ): Def | Store[Key] {
    return (justUse(() => this.getKeyvalues().get({ key }) as never as { val: Store[Key] })?.val as never) ?? def;
  }

  useSingleValueState<Key extends keyof Store, Def extends Store[Key] | und>(key: Key, def?: Def) {
    return [
      this.useSingleValueLiveQuery(key, def),
      justCallback(
        (val: Store[Key] | ((val: Store[Key]) => Store[Key])) => this.setSingleValue(key, val as never),
        emptyArray,
      ),
    ] as const;
  }
}

const justUse = useLiveQuery;
const justCallback = useCallback;
