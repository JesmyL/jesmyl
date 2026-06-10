import { checkIsArray, checkIsNil, checkIsObject } from './checkIs';

export const objectEntries = <T>(
  it: T,
): [T extends object | nil ? (keyof T extends number ? `${keyof T}` : keyof T) : string, T[keyof T]][] =>
  checkIsObject(it) ? (Object.entries(it) as never) : [];

export const objectKeys = <T, Key extends T extends object | nil ? keyof T : string>(it: T): Key[] =>
  checkIsObject(it) ? (Object.keys(it) as never) : [];

export const arrayByLength = <Value>(length: number, map: (index: number, value: unknown) => Value): Value[] =>
  Array.from({ length }, (v, i) => map(i, v));

export const objectLength = <const It extends object | unknown[] | nil>(
  it: It,
): It extends nil ? 0 : It extends unknown[] ? (It extends { length: infer L } ? L : number) : number =>
  (checkIsNil(it) ? 0 : checkIsArray(it) ? it.length : objectKeys(it).length) as never;

export const forEachObjectEntries = <T>(
  it: T,
  eacher: (
    key: T extends object | nil ? (keyof T extends number ? `${keyof T}` : keyof T) : string,
    value: T[keyof T],
  ) => void,
) => {
  if (checkIsObject(it)) for (const key in it) eacher(key as never, it[key] as never);
};

export const mapObjectEntries = <T, Ret>(
  it: T,
  mapper: (
    key: T extends object | nil ? (keyof T extends number ? `${keyof T}` : keyof T) : string,
    value: T[keyof T],
    index: number,
  ) => Ret,
): Ret[] => {
  let i = 0;
  const result: Ret[] = [];
  if (checkIsObject(it)) for (const key in it) result.push(mapper(key as never, it[key] as never, i++));
  return result;
};
