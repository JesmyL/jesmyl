export const objectEntries = <T>(
  it: T,
): [T extends object | nil ? (keyof T extends number ? `${keyof T}` : keyof T) : string, T[keyof T]][] =>
  it ? (Object.entries(it) as never) : [];

export const objectKeys = <T, Key extends T extends object | nil ? keyof T : string>(it: T): Key[] =>
  it ? (Object.keys(it) as never) : [];

export const arrayByLength = <Value>(length: number, map: (index: number, value: unknown) => Value): Value[] =>
  Array.from({ length }, (v, i) => map(i, v));
