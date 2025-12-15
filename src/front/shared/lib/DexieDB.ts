/* eslint-disable @typescript-eslint/no-explicit-any */
import Dexie, { EntityTable, TableHooks } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';

import { smylib, SMyLib } from 'shared/utils';
import { mylib } from './my-lib';

const keyvalues = '%keyvalues%';
const byDefaultField = '$byDefault';
type ByDefaultField = typeof byDefaultField;

export type DexiedValueSetter<Store, K extends keyof Store, RetVal = void> = (
  value: Store[K] | ((val: Store[K]) => Store[K]),
) => RetVal;

export class DexieDB<Store> {
  db: Dexie &
    Required<{
      [K in keyof Store]: Store[K] extends unknown[] ? EntityTable<Store[K][number], keyof Store[K][number]> : never;
    }>;

  tb: Required<{
    [K in keyof Store]: Store[K] extends unknown[] ? EntityTable<Store[K][number], keyof Store[K][number]> : never;
  }>;

  hook: TableHooks<unknown> = ((...args: []) =>
    (this.getKeyvalues() as { hook(...args: unknown[]): unknown }).hook(...args)) as never;

  set = {} as { [K in keyof Required<Store>]: DexiedValueSetter<Store, K, Promise<void>> };
  get = {} as { [K in keyof Required<Store>]: () => Promise<Store[K]> };
  remove = {} as { [K in keyof Required<Store>]: () => Promise<number> };

  use = {} as { [K in keyof Required<Store>]: () => [Store[K], DexiedValueSetter<Store, K>] };
  useSet = {} as { [K in keyof Required<Store>]: () => DexiedValueSetter<Store, K> };
  useValue = {} as { [K in keyof Required<Store>]: () => Store[K] };

  updateLastModifiedAt!: Store extends { lastModifiedAt: number } ? (modifiedAt: number) => Promise<void> : never;

  constructor(
    storageName: string,
    defaults: Required<{
      [K in keyof Store]: Store[K] extends any[]
        ?
            | Omit<Partial<Record<'_', '++'> & Record<keyof Store[K][number], true | '++'>>, ByDefaultField>
            | Record<ByDefaultField, (() => Store[K]) | Store[K]>
        : Record<ByDefaultField, (() => Store[K]) | Store[K]>;
    }>,
    version = 1,
  ) {
    this.tb = this.db = new Dexie(storageName) as never;

    const returnIfKeyInDefaults = <Cb>(key: keyof Store | string | symbol, cb: Cb) => {
      if (key in defaults) return cb;
    };

    const takeValueFromDefaults = (key: keyof Store) => {
      if (mylib.isFunc(defaults[key][byDefaultField])) {
        return defaults[key][byDefaultField]();
      }

      return defaults[key][byDefaultField];
    };

    const proxyGetForGet = (_: unknown, key: keyof Store) =>
      returnIfKeyInDefaults(key, async () => {
        const store = await this.getKeyvalues().get({ key });
        if (store === undefined) return takeValueFromDefaults(key);
        return store.val;
      });

    this.get = new Proxy(this.get, { get: proxyGetForGet as never });

    const proxyGetForUseValue = (_: unknown, key: keyof Store) =>
      returnIfKeyInDefaults(key, () => {
        return justUseLiveQuery(() => this.getKeyvalues().get({ key }))?.val ?? takeValueFromDefaults(key);
      });

    this.useValue = new Proxy(this.useValue, { get: proxyGetForUseValue as never });

    this.remove = new Proxy(this.remove, {
      get: (_, key) => returnIfKeyInDefaults(key, () => this.getKeyvalues().where({ key }).delete()),
    });

    this.use = new Proxy(this.use, {
      get: (_, key) =>
        returnIfKeyInDefaults(key, () => [this.useValue[key as keyof Store](), this.useSet[key as keyof Store]()]),
    });

    this.useSet = new Proxy(this.useSet, {
      get: (_, key) =>
        returnIfKeyInDefaults(key, () =>
          justUseCallback((value: unknown) => this.set[key as keyof Store](value as never), []),
        ),
    });

    this.set = new Proxy(this.set, {
      get: (_, key) => {
        return returnIfKeyInDefaults(key, async (value: Parameters<(typeof this.set)[keyof Store]>[0]) => {
          if (smylib.isFunc(value)) {
            return await this.getKeyvalues().put({
              val: value(await this.get[key as keyof Store]()),
              key,
            } as never);
          } else {
            return await this.getKeyvalues().put({ val: value, key } as never);
          }
        });
      },
    });

    const stores = {} as Record<keyof Store, string>;

    smylib.keys(defaults).forEach(key => {
      if (byDefaultField in defaults[key]) return;

      stores[key] = SMyLib.entries(defaults[key])
        .map(([key, val]) => `${val === '++' ? val : ''}${key as never}`)
        .join(', ');
    });

    stores[keyvalues as keyof Store] = '++key';

    this.db.version(version).stores(stores);

    if ('lastModifiedAt' in defaults) {
      (async () => {
        type WithLastModifiedAt = { lastModifiedAt(set?: number): Promise<number> };

        let lastModifiedLocal: number = await (this.get as WithLastModifiedAt).lastModifiedAt();
        let timeout: TimeOut;

        this.updateLastModifiedAt = (async (modifiedAt: number) => {
          if (lastModifiedLocal >= modifiedAt) return;
          lastModifiedLocal = modifiedAt;

          clearTimeout(timeout);
          timeout = setTimeout(() => (this.set as WithLastModifiedAt).lastModifiedAt(modifiedAt), 100);
        }) as never;
      })();
    }
  }

  private getKeyvalues = () =>
    this.db[keyvalues as never] as EntityTable<{ val: Store[keyof Store]; key: keyof Store }>;
}

const justUseLiveQuery = useLiveQuery;
const justUseCallback = useCallback;
