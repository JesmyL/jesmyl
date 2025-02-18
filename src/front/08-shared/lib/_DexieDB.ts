import Dexie, { EntityTable, TableHooks } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { emptyArray, SMyLib, smylib } from '../../../shared/utils';

const keyvalues = '%keyvalues%';
const byDefaultField = '$byDefault';
type ByDefaultField = typeof byDefaultField;

type ValueSetter<Store, K extends keyof Store, RetVal = void> = (
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

  private selectors = {} as { [K in keyof Required<Store>]: K };

  hook: TableHooks<any> = ((...args: []) =>
    (this.getKeyvalues() as { hook(...args: unknown[]): unknown }).hook(...args)) as never;

  set = {} as { [K in keyof Required<Store>]: ValueSetter<Store, K, Promise<void>> };
  get = {} as { [K in keyof Required<Store>]: () => Promise<Store[K]> };
  remove = {} as { [K in keyof Required<Store>]: () => Promise<number> };

  use = {} as { [K in keyof Required<Store>]: () => [Store[K], ValueSetter<Store, K>] };
  useSet = {} as { [K in keyof Required<Store>]: () => ValueSetter<Store, K> };
  useValue = {} as { [K in keyof Required<Store>]: () => Store[K] };

  updateLastModifiedAt!: Store extends { lastModifiedAt: number } ? (modifiedAt: number) => Promise<void> : never;

  constructor(
    storageName: string,
    private defaults: Required<{
      [K in keyof Store]: Store[K] extends any[]
        ?
            | Omit<Partial<Record<'_', '++'> & Record<keyof Store[K][number], true | '++'>>, ByDefaultField>
            | Record<ByDefaultField, Store[K]>
        : Record<ByDefaultField, Store[K]>;
    }>,
    version = 1,
  ) {
    this.tb = this.db = new Dexie(storageName) as never;

    const stores = {} as Record<keyof Store, string>;

    smylib.keys(defaults).forEach(key => {
      if (byDefaultField in defaults[key]) {
        this.selectors[key] = key;
        this.get[key] = (async () => {
          const store = await this.getKeyvalues().get({ key });
          if (store === undefined) return this.defaults[key][byDefaultField];
          return store.val;
        }) as never;

        this.remove[key] = () => this.getKeyvalues().where({ key }).delete();

        this.set[key] = async value => {
          if (smylib.isFunc(value)) {
            return await this.getKeyvalues().put({ val: value(await this.get[key]()), key } as never);
          } else {
            return await this.getKeyvalues().put({ val: value, key } as never);
          }
        };

        this.use[key] = () => [this.useValue[key](), this.useSet[key]()];

        this.useSet[key] = () => justUseCallback((value: unknown) => this.set[key](value as never), emptyArray);

        const defaultValue = this.defaults[key][byDefaultField];

        this.useValue[key] = () => {
          return (
            justUseLiveQuery(() => this.getKeyvalues().get({ key }) as never as { val: never })?.val ??
            (defaultValue as never)
          );
        };

        return;
      }

      stores[key] = SMyLib.entries(defaults[key])
        .map(([key, val]) => `${val === '++' ? val : ''}${key as never}`)
        .join(', ');
    });

    stores[keyvalues as keyof Store] = '++key';

    this.db.version(version).stores(stores);

    if ('lastModifiedAt' in this.defaults) {
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
