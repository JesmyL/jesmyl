import { checkIsArray, checkIsNil, checkIsObject, checkIsString } from './checkIs';

export const objectEntries = <T>(
  it: T,
): [T extends object | nil ? (keyof T extends number ? `${keyof T}` : keyof T) : string, NonNullable<T>[keyof T]][] =>
  checkIsObject(it) ? (Object.entries(it) as never) : [];

export const objectKeys = <T>(
  it: T,
): (T extends object | nil ? (keyof T extends number ? `${keyof T}` : keyof T) : string)[] =>
  checkIsObject(it) ? (Object.keys(it) as never) : [];

export const objectValues = <T>(it: T): NonNullable<T>[keyof T][] =>
  checkIsObject(it) ? (Object.values(it) as never) : [];

export const arrayByLength = <Value>(length: number, map: (index: number, value: unknown) => Value): Value[] =>
  Array.from({ length }, (v, i) => map(i, v));

export const objectLength = <const It extends object | unknown[] | string | nil>(
  it: It,
): It extends nil ? 0 : It extends unknown[] ? (It extends { length: infer L } ? L : number) : number =>
  (checkIsNil(it) ? 0 : checkIsArray(it) || checkIsString(it) ? it.length : objectKeys(it).length) as never;

export const forEachObjectEntries = <T>(
  it: T,
  eacher: (
    key: T extends object | nil ? (keyof T extends number ? `${keyof T}` : keyof T) : string,
    value: NonNullable<T>[keyof T],
    index: number,
  ) => void,
) => {
  let i = 0;
  if (checkIsObject(it)) for (const key in it) eacher(key as never, it[key] as never, i++);
};

export const forEachObjectEntriesSimple: <T>(
  it: T,
  eacher: (key: keyof NonNullable<T>, value: NonNullable<T>[keyof T], index: number) => void,
) => void = forEachObjectEntries as never;

export const mapObjectEntries = <T, Ret>(
  it: T,
  mapper: (
    key: T extends object | nil ? (keyof T extends number ? `${keyof T}` : keyof T) : string,
    value: NonNullable<T>[keyof T],
    index: number,
  ) => Ret,
): Ret[] => {
  let i = 0;
  const result: Ret[] = [];
  if (checkIsObject(it)) for (const key in it) result.push(mapper(key as never, it[key] as never, i++));
  return result;
};

export const objectGroupBy: typeof Object.groupBy = (iterable, keySelector) => {
  const result: Record<string, unknown[]> = {};
  iterable = Array.from(iterable);
  for (let i = 0; i < (iterable as []).length; i++) {
    const key = keySelector(iterable[i as never] as never, i);
    result[key as never] ??= [];
    result[key as never].push(iterable[i as never]);
  }

  return result as never;
};

export const convertObjectToArray = <Value, Obj extends Record<number, Value>>(obj: Obj) => {
  const result: Value[] = [];
  forEachObjectEntries(obj, (key, value) => (result[key as number] = value as never));
  return result as Obj & Value[];
};
