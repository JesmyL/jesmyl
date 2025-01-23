import Dexie, { EntityTable } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { emptyArray, SMyLib, smylib } from '../../shared/utils';

const keyvalues = '%keyvalues%';
const byDefaultField = '$byDefault';
type ByDefaultField = typeof byDefaultField;

type ValueSetter<Store, K extends keyof Store> = (value: Store[K] | ((val: Store[K]) => Store[K])) => void;

export class DexieDB<Store> {
  db: Dexie &
    Required<{
      [K in keyof Store]: Store[K] extends unknown[] ? EntityTable<Store[K][number], keyof Store[K][number]> : never;
    }>;

  private selectors = {} as { [K in keyof Required<Store>]: K };

  set = {} as { [K in keyof Required<Store>]: ValueSetter<Store, K> };
  get = {} as { [K in keyof Required<Store>]: () => Promise<Store[K]> };
  rem = {} as { [K in keyof Required<Store>]: () => Promise<number> };

  use = {} as { [K in keyof Required<Store>]: () => [Store[K], ValueSetter<Store, K>] };
  useSet = {} as { [K in keyof Required<Store>]: () => ValueSetter<Store, K> };
  useValue = {} as { [K in keyof Required<Store>]: () => Store[K] };

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
    this.db = new Dexie(storageName) as never;

    const stores = {} as Record<keyof Store, string>;

    smylib.keys(defaults).forEach(key => {
      if (byDefaultField in defaults[key]) {
        this.selectors[key] = key;
        this.get[key] = async () => {
          const store = (await this.getKeyvalues().get({ key })) as any;
          if (store === undefined) return this.defaults[key][byDefaultField];
          return store.val;
        };

        this.rem[key] = () => this.getKeyvalues().where({ key }).delete();

        this.set[key] = async value => {
          if (smylib.isFunc(value)) {
            return await this.getKeyvalues().put({ val: value(await this.get[key]()), key });
          } else {
            return await this.getKeyvalues().put({ val: value, key });
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
  }

  private getKeyvalues = () => this.db[keyvalues as never] as EntityTable<unknown>;
}

const justUseLiveQuery = useLiveQuery;
const justUseCallback = useCallback;
