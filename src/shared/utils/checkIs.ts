export const checkIsStartsWith = <Start extends string>(value: string, start: Start): value is `${Start}${string}` =>
  value.startsWith(start);

export const checkIsEndsWith = <End extends string>(value: string, end: End): value is `${string}${End}` =>
  value.endsWith(end);

export const checkIsObject = (it: unknown): it is Record<string, unknown> => checkIsAnyObject(it) && !checkIsArray(it);
export const checkIsNotObject = <It>(it: It): it is Exclude<It, Record<string, unknown>> => !checkIsObject(it);

export const checkIsAnyObject = (it: unknown): it is Record<string | number, unknown> | unknown[] =>
  typeof it === 'object' && it != null;

export const checkIsBoolean = (it: unknown): it is boolean => typeof it === 'boolean';
export const checkIsString = (it: unknown): it is string => typeof it === 'string';
export const checkIsNumber = (it: unknown): it is number => typeof it === 'number';
export const checkIsFunction = <Fun extends func>(it: unknown | Fun): it is Fun => typeof it === 'function';

export const checkIsNotBoolean = <It>(it: It): it is Exclude<It, boolean> => typeof it !== 'boolean';
export const checkIsNotString = <It>(it: It): it is Exclude<It, string> => typeof it !== 'string';
export const checkIsNotNumber = <It>(it: It): it is Exclude<It, number> => typeof it !== 'number';
export const checkIsNotFunction = <Fun extends func>(it: unknown | Fun): it is Exclude<Fun, func> =>
  typeof it !== 'function';

export const checkIsRealNumber = (it: unknown): it is number => checkIsNumber(it) && !isNaN(it);

export const checkIsRegExp = (it: unknown): it is RegExp => it instanceof RegExp;

export const checkIsJsDate = (it: unknown): it is Date => it instanceof Date;

export const checkIsJsDateMold = (it: unknown): it is number | string | Date =>
  checkIsString(it) || checkIsNumber(it) || checkIsJsDate(it);

export const checkIsJsDateCorrectMold = (it: unknown): it is number | string | Date =>
  checkIsJsDateMold(it) && !checkIsNaN(new Date(it).getTime());

export const checkIsNumeric = (it: number | string): it is number | `${number}` => parseFloat(it as string) == it;

export const checkIsArray = <Item = unknown>(it: unknown): it is Item[] => Array.isArray(it);

export const checkIsAsyncFunction = <Fun extends func>(it: unknown | Fun): it is Fun =>
  checkIsFunction(it) && (it as never as { [Symbol.toStringTag]: unknown })[Symbol.toStringTag] === 'AsyncFunction';

export const checkIsUndefined = (it: unknown): it is undefined => it === undefined;
export const checkIsNotUndefined = <It>(it: It): it is Exclude<It, undefined> => it !== undefined;

export const checkIsNull = (it: unknown): it is null => it === null;
export const checkIsNotNull = <It>(it: It): it is Exclude<It, null> => it !== null;

export const checkIsNil = (it: unknown): it is null | undefined => checkIsNull(it) || checkIsUndefined(it);
export const checkIsNotNil = <It>(it: It): it is Exclude<It, null | undefined> => it != null;

export const checkIsNaN = (it: unknown) => checkIsNumber(it) && isNaN(it);

export const checkIsNotANumber = (it: unknown): it is number => !checkIsNumber(it) || isNaN(it);
