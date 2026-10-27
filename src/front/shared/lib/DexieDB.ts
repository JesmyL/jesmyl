/* eslint-disable @typescript-eslint/no-explicit-any */
import Dexie, { EntityTable, type Transaction } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { checkIsArray, checkIsFunction } from 'shared/utils/checkIs';
import { forEachObjectEntries, mapObjectEntries } from 'shared/utils/object.utils';

const keyvalues = '%keyvalues%';

export type DexiedValueSetter<Store, K extends keyof Store, RetVal = void> = (
  value: Store[K] | ((val: Store[K]) => Store[K]),
) => RetVal;

export type DexieSchemaExtra = [
  version: number,
  stores: Record<string, string | null>,
  upgrade?: (transaction: Transaction) => PromiseLike<unknown> | void,
];

export class DexieDB<Store> {
  db: Dexie &
    Required<{
      [K in keyof Store]: Store[K] extends unknown[] ? EntityTable<Store[K][number], keyof Store[K][number]> : never;
    }>;

  tb: Required<{
    [K in keyof Store]: Store[K] extends unknown[] ? EntityTable<Store[K][number], keyof Store[K][number]> : never;
  }>;

  set = {} as { [K in keyof Required<Store>]: DexiedValueSetter<Store, K, Promise<void>> };
  get = {} as { [K in keyof Required<Store>]: () => Promise<Store[K]> };
  remove = {} as { [K in keyof Required<Store>]: () => Promise<number> };

  use = {} as { [K in keyof Required<Store>]: () => [Store[K], DexiedValueSetter<Store, K>] };
  useSet = {} as { [K in keyof Required<Store>]: () => DexiedValueSetter<Store, K> };
  useValue = {} as { [K in keyof Required<Store>]: () => Store[K] };

  updateLastModifiedAt!: Store extends { lastModifiedAt: number } ? (modifiedAt: number) => Promise<void> : never;
  resetLastModifiedAt!: Store extends { lastModifiedAt: number } ? () => Promise<void> : never;

  constructor(
    storageName: string,
    defaults: Required<{
      [K in keyof Store]: Store[K] extends any[]
        ?
            | Partial<Record<'_', '++'> & Record<keyof Store[K][number], true | '++'> & Record<string, true | '++'>>
            | [(() => Store[K]) | Store[K]]
        : [(() => Store[K]) | Store[K]];
    }>,
    version = 1,
    upgrade?: (transaction: Transaction) => PromiseLike<unknown>,
    schemaExtras?: DexieSchemaExtra[],
  ) {
    this.tb = this.db = new Dexie(storageName) as never;

    this.db.on('versionchange', () => {
      this.db.close();
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    });

    this.db.on('blocked', () => {
      console.error('Доступ к базе данных заблокирован другой вкладкой.');
    });

    const returnIfKeyInDefaults = <Cb>(key: keyof Store | string | symbol, cb: Cb) => {
      if (key in defaults) return cb;
    };

    const takeValueFromDefaults = (key: keyof Store) => {
      if (checkIsArray(defaults[key]) && checkIsFunction(defaults[key][0])) {
        return defaults[key][0]();
      }

      return defaults[key][0];
    };

    const proxyGetForGet = (_: unknown, key: keyof Store) =>
      returnIfKeyInDefaults(key, async () => {
        try {
          const store = await this.getKeyvalues().get({ key });
          if (store === undefined) return takeValueFromDefaults(key);
          return store.val;
        } catch {
          return takeValueFromDefaults(key);
        }
      });

    this.get = new Proxy(this.get, { get: proxyGetForGet as never });

    const proxyGetForUseValue = (_: unknown, key: keyof Store) =>
      returnIfKeyInDefaults(key, () => {
        try {
          return justUseLiveQuery(() => this.getKeyvalues().get({ key }))?.val ?? takeValueFromDefaults(key);
        } catch {
          return takeValueFromDefaults(key);
        }
      });

    this.useValue = new Proxy(this.useValue, { get: proxyGetForUseValue as never });

    this.remove = new Proxy(this.remove, {
      get: (_, key) =>
        returnIfKeyInDefaults(key, async () => {
          try {
            return await this.getKeyvalues().where({ key }).delete();
          } catch {
            return 0;
          }
        }),
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
          try {
            if (checkIsFunction(value)) {
              return await this.getKeyvalues().put({
                val: value(await this.get[key as keyof Store]()),
                key,
              } as never);
            } else {
              return await this.getKeyvalues().put({ val: value, key } as never);
            }
          } catch {
            //
          }
        });
      },
    });

    const stores = {} as Record<keyof Store, string>;

    forEachObjectEntries(defaults, (key, values) => {
      if (checkIsArray(values)) return;

      stores[key as keyof Store] = mapObjectEntries(
        values,
        (key, val) => `${val === '++' ? val : ''}${key as never}`,
      ).join(', ');
    });

    stores[keyvalues as keyof Store] = '++key';
    const versionedDb = this.db.version(version).stores(stores);
    if (upgrade) versionedDb.upgrade(upgrade);

    /**
     * Legacy stores are dropped only through Dexie schema steps (`{ storeName: null }`).
     * A parallel native `indexedDB.open` with a version bump is forbidden here: it races Dexie's
     * own upgrade transaction and aborts it (AbortError), after which every query on this database
     * hangs and the app renders an empty shell. Unknown stores left by removed features are simply
     * ignored by Dexie, so a declaration step is enough.
     */
    schemaExtras?.forEach(([extraVersion, extraStores, extraUpgrade]) => {
      const extraVersionedDb = this.db.version(extraVersion).stores(extraStores);
      if (extraUpgrade) extraVersionedDb.upgrade(extraUpgrade);
    });

    if ('lastModifiedAt' in defaults) {
      (async () => {
        type WithLastModifiedAt = { lastModifiedAt(set?: number): Promise<number> };

        let lastModifiedLocal: number = 0;
        try {
          lastModifiedLocal = await (this.get as WithLastModifiedAt).lastModifiedAt();
        } catch {
          //
        }

        let timeout: TimeOut;

        const update = (modifiedAt: number) => {
          const { promise, resolve } = Promise.withResolvers();
          lastModifiedLocal = modifiedAt;

          clearTimeout(timeout);
          timeout = setTimeout(() => {
            (this.set as WithLastModifiedAt)
              .lastModifiedAt(modifiedAt)
              .then(() => resolve(modifiedAt))
              .catch(() => resolve(modifiedAt));
          }, 100);

          return promise;
        };

        this.updateLastModifiedAt = (async (modifiedAt: number) => {
          if (!modifiedAt || lastModifiedLocal >= modifiedAt) return;
          return update(modifiedAt);
        }) as never;

        this.resetLastModifiedAt = (() => update(0)) as never;
      })();
    }
  }

  private getKeyvalues = () =>
    this.db[keyvalues as never] as EntityTable<{ val: Store[keyof Store]; key: keyof Store }>;
}

const justUseLiveQuery = useLiveQuery;
const justUseCallback = useCallback;
