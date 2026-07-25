const inSec = 1000;
const inMin = inSec * 60;
const inHour = inMin * 60;
const inDay = inHour * 24;

/** @deprecated */
export class SMyLib {
  howMs = {
    inSec,
    inMin,
    inHour,
    inDay,
  };

  isObj = (it: unknown): it is Record<string, unknown> => it instanceof Object && !(it instanceof Array);
  isobj = (it: unknown): it is Record<string | number, unknown> | unknown[] => typeof it === 'object' && it != null;
  isArr = <Item = unknown>(it: unknown): it is Item[] => it instanceof Array;
  isNum = (it: unknown): it is number => typeof it === 'number' && !isNaN(it);
  isnum = (it: number | string): it is number => parseFloat(it as string) == it;
  isStr = (it: unknown): it is string => typeof it === 'string';
  isFunc = <Fun extends Function>(it: unknown | Fun): it is Fun => typeof it === 'function';
  isRegExp = (it: unknown): it is RegExp => it instanceof RegExp;

  isUnd = (it: unknown): it is undefined => it === undefined;
  isBool = (it: unknown): it is boolean => typeof it === 'boolean';
  isNull = (it: unknown): it is null => it === null;
  isNil = (it: unknown): it is null | undefined => it === null || it === undefined;
  isNaN = (it: unknown): it is NaN => typeof it === 'number' && isNaN(it);
  isNl = (it: unknown) => this.isNaN(it) || this.isNil(it);
  isNNlButUnd = (it: unknown) => (this.isNl(it) ? undefined : true);

  static entries = <T>(it: T): [keyof T | (keyof T extends number ? `${keyof T}` : keyof T), T[keyof T]][] =>
    (it == null ? [] : Object.entries(it)) as never;

  static keys<T, Key extends T extends object ? keyof T : string>(it: T): Key[] {
    if (it == null) return [];
    return Object.keys(it) as never;
  }

  keys<T extends object | nil>(it: T): (keyof T)[] {
    if (it == null) return [];
    return Object.keys(it) as never;
  }

  values<T extends object | nil>(it: T): T[keyof T][] {
    if (it == null) return [];
    return Object.values(it) as never;
  }

  mapFilter = <Item, Val>(
    items: Item[],
    cb: (item: Item, index: number, items: Item[]) => Val | undefined,
  ): Exclude<Val, undefined>[] => {
    const result: Exclude<Val, undefined>[] = [];

    for (let i = 0; i < items.length; i++) {
      const val = cb(items[i], i, items);
      if (val !== undefined) result.push(val as never);
    }

    return result;
  };

  static groupBy: typeof Object.groupBy = (iterable, keySelector) => {
    const result: Record<string, unknown[]> = {};
    iterable = Array.from(iterable);
    for (let i = 0; i < (iterable as []).length; i++) {
      const key = keySelector(iterable[i as never] as never, i);
      result[key as never] ??= [];
      result[key as never].push(iterable[i as never]);
    }

    return result as never;
  };

  takeNextMi<Mi extends number, Item extends { [k in MiKey]: Mi }, MiKey extends string = 'mi'>(
    list: Item[],
    minimalMi: Mi,
    miKey?: MiKey,
  ): Mi {
    const key = miKey ?? 'mi';
    return (list.reduce((max, item) => Math.max(item[key as never] as never, max), minimalMi - 1) + 1) as never;
  }

  takeKeyId<Id extends number>(prev: PRecord<Id, unknown>, minId: Id): Id {
    let id: number = minId;
    for (; id in prev; id++);
    return id as Id;
  }

  withInsertedBeforei<Item>(list: Item[], beforei: number, targeti: number) {
    const fakeEvent = {} as Item;
    list = [...list];
    const event = list.splice(targeti, 1, fakeEvent)[0];
    list.splice(beforei, 0, event);

    return list.filter(event => event !== fakeEvent);
  }

  convertSecondsInStrTime(seconds: number) {
    return (
      Math.floor(seconds / 60)
        .toFixed(0)
        .padStart(2, '0') +
      ':' +
      Math.floor(seconds % 60)
        .toFixed(0)
        .padStart(2, '0')
    );
  }
}

/** @deprecated */
export const smylib = new SMyLib();
