import { makeRegExp } from 'regexpert';
import { checkIsNaN } from './checkIs';

export const itIt = <It>(it: It) => it;
export const itTrim = (it: string) => it.trim();
export const itNIt = <It>(it: It) => !it;
export const isNIs = (is: boolean) => !is;
/** @deprecated */
export const itIs = <It>(it: It): it is Exclude<It, FalsyValue> => !!it;
export const itNumSort = (a: number, b: number) => a - b;
export const itNumSortReverse = (a: number, b: number) => b - a;
export const emptyFunc = () => {};
export const emptyAsyncFunc = async () => {};
export const retUnd = () => undefined;
export const itNUnd = <It>(it: It) => it !== undefined;
export const retNull = () => null;
export const itNNull = <It>(it: It) => it !== null;
export const itNNil = <It>(it: It) => it != null;
export const itNNaN = (it: number) => typeof it !== 'number' || !isNaN(it);
export const itInvokeIt = <Ret>(it: () => Ret) => it();
export const wait = (waitTime = 100) => new Promise(resolve => setTimeout(resolve, waitTime));
export const trimTextLines = (text: string) => text.trim().replace(makeRegExp('/(.+?)\\s+?\\n/g'), '$1\n');

export const iife = <Val>(fun: () => Val) => fun();

type ParseNumber<T extends string | number> = T extends `${infer N extends number}` ? N : T;
export const extractNumber = <T extends string | number>(value: T) => {
  const val = parseFloat(`${value}`);
  return (checkIsNaN(val) ? value : val) as ParseNumber<T>;
};

// JSON
declare const jsonBrand: unique symbol;
export type JsonString<T> = string & { readonly [jsonBrand]: T };

export const jsonStringify = <Val>(val: Val) => JSON.stringify(val) as JsonString<Val>;
export const jsonParse = <T>(val: JsonString<T>) => JSON.parse(val) as T;
// JSON
