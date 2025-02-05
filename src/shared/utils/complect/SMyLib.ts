/* eslint-disable eqeqeq */
import md5 from 'md5';
import { makeRegExp } from './makeRegExp';
import { itIt, itNIt } from './utils';

export type StringTemplaterArgs<Adds = {}> = {
  ink: (num: number, post: string, pre: string) => string;
  switch: () => string;
} & Adds;

const inSec = 1000;
const inMin = inSec * 60;
const inHour = inMin * 60;
const inDay = inHour * 24;

export class SMyLib {
  howMs = {
    inSec,
    inMin,
    inHour,
    inDay,
  };

  getMilliseconds(monthDays = 30, yearDays = 365) {
    const inMonth = inDay * monthDays;
    const inYear = inDay * yearDays;

    return { inSec, inMin, inHour, inDay, inMonth, inYear };
  }

  isObj = (it: unknown): it is Record<string, unknown> => it instanceof Object && !(it instanceof Array);
  isobj = (it: unknown): it is Record<string | number, unknown> | unknown[] => typeof it === 'object' && it != null;
  isArr = <Item = any>(it: any): it is Item[] => it instanceof Array;
  isNum = (it: unknown): it is number => typeof it === 'number' && !isNaN(it);
  isnum = (it: number | string): it is number => parseFloat(it as string) == it;
  isStr = (it: unknown): it is string => typeof it === 'string';
  isFunc = <Fun extends Function>(it: unknown | Fun): it is Fun => typeof it === 'function';
  isRegExp = (it: unknown): it is RegExp => it instanceof RegExp;
  isAFunc = (it: Function | unknown): it is Function =>
    this.isFunc(it) && (it as never as { [Symbol.toStringTag]: unknown })[Symbol.toStringTag] === 'AsyncFunction';
  isUnd = (it: unknown): it is undefined => it === undefined;
  isBool = (it: unknown): it is boolean => typeof it === 'boolean';
  isNull = (it: unknown): it is null => it === null;
  isNil = (it: unknown): it is null | undefined => it === null || it === undefined;
  isNaN = (it: unknown): it is NaN => typeof it === 'number' && isNaN(it);
  isNl = (it: unknown) => this.isNaN(it) || this.isNil(it);
  isNNlOrUnd = (it: unknown) => (this.isNl(it) ? undefined : true);

  static entries = <T>(it: T): [keyof T, T[keyof T]][] => (it == null ? [] : Object.entries(it)) as never;

  static keys<T, Key extends T extends Record<infer Key, unknown> | PRecord<infer Key, unknown> ? Key : string>(
    it: T,
  ): Key[] {
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

  toRandomSorted = <Item>(arr: Item[]) => {
    const items: Item[] = [];
    const arrClone = [...arr];

    for (let i = 0; i < arr.length; i++) items.push(arrClone.splice(this.randomOf(0, arrClone.length - 1), 1)[0]);

    return items;
  };

  randomOf = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
  randomIndex = (arr: unknown[] | string, sliceEnd?: number) =>
    this.randomOf(0, arr.length - 1 + (sliceEnd === undefined ? 0 : sliceEnd));
  randomItem = <Item extends unknown[] | string, RetItem extends Item extends (infer It)[] ? It : string>(
    arr: Item,
    sliceEnd?: number,
  ): RetItem => arr[this.randomIndex(arr, sliceEnd)] as RetItem;

  explode(separator: string, string: string, lim?: number) {
    const limit = lim && Math.abs(lim);
    const splitted = string.split(separator);
    if (!this.isNum(limit)) return splitted;

    return splitted.reduce((res: string[], curr: string, curri: number) => {
      if (limit > curri) return res.concat([curr]);
      else res[res.length - 1] += separator + curr;
      return res;
    }, []);
  }

  clone<Val>(what: Val): Val {
    if (what === null || what === undefined) return what;
    else if (what.constructor === Object) {
      const newObj: Record<string, unknown> = {};
      for (const whatn in what) newObj[whatn] = this.clone(what[whatn as never]);
      return newObj as Val;
    } else if (this.isArr(what)) {
      const newObj: unknown[] = [];
      for (const whatn in what) newObj[whatn] = this.clone(what[whatn as never]);
      return newObj as Val;
    }
    return what;
  }

  takeNextMi<Mi extends number, Item extends Record<MiKey, Mi | number>, MiKey extends string = 'mi'>(
    list: Item[],
    minimalMi: Mi | number,
    miKey?: MiKey,
  ) {
    const key = miKey ?? 'mi';
    return list.reduce((max, item) => Math.max(item[key as never] as never, max), minimalMi - 1) + 1;
  }

  isEq(base: unknown, source: unknown, isIgnoreArrayItemsOrder?: boolean) {
    if (base === source) return true;
    if (base == null && base == source) return true;
    if (base == null || source == null) return false;

    if (this.typeOf(base) !== this.typeOf(source)) return false;

    if (typeof base === 'object') {
      if (this.isArr(base) && this.isArr(source)) {
        if (base.length !== source.length) return false;

        if (isIgnoreArrayItemsOrder) {
          for (const bVal of base) {
            let isNotFound = true;

            for (const sVal of source)
              if (this.isEq(bVal, sVal, isIgnoreArrayItemsOrder)) {
                isNotFound = false;
                break;
              }

            if (isNotFound) return false;
          }

          return true;
        } else {
          for (let basei = 0; basei < base.length; basei++) {
            if (!this.isEq(base[basei], source[basei], isIgnoreArrayItemsOrder)) return false;
          }

          return true;
        }
      }

      const bEntries = Object.entries(base).filter(([, val]) => val !== undefined);
      const sEntries = Object.entries(source).filter(([, val]) => val !== undefined);

      if (
        bEntries.length !== sEntries.length ||
        bEntries.some(([bKey, bVal]) => !this.isEq(bVal, source[bKey as never], isIgnoreArrayItemsOrder))
      )
        return false;
    } else if (base !== source) return false;

    return true;
  }

  typeOf(obj: unknown): string | null {
    return (
      (['isStr', 'isNum', 'isBool', 'isArr', 'isNull', 'isUnd', 'isFunc', 'isObj', 'isNan'] as (keyof SMyLib)[]).find(
        (type: keyof SMyLib) => (this[type] as Function)(obj),
      ) || null
    );
  }

  md5(content: string) {
    return md5(content);
  }

  declension(num: number, one?: string, two?: string, five?: string) {
    if (num % 1) return two!;
    let absNum = Math.abs(num) % 100;

    if (absNum > 10 && absNum < 20) return five ?? two!;

    absNum %= 10;

    return absNum > 1 && absNum < 5 ? two! : absNum === 1 ? one! : five ?? two!;
  }

  stringTemplaterFunctions = {
    ink: (num: number, post = '', pre = '') => (num == null ? null : `${pre}${num - -1}${post}`),
    switch: (...args: []) => {
      let val: unknown, found: unknown;

      const ret = args.find((arg, argi) => {
        if (!argi) {
          val = arg;
          return false;
        }

        if (found) return true;
        if (argi % 2 && arg == val) found = true;
        return false;
      });

      return ret == null ? args[args.length - 1] : ret;
    },
    declension: this.declension,
    keys: this.keys,
    join: (by: string, ...arr: []) => arr.join(by),
    count: (obj: object) => this.keys(obj).length,
    isEq: (...args: unknown[]) => {
      let val: unknown;

      return !args.some((arg, argi) => {
        if (argi) return !this.isEq(arg, val);
        val = arg;
        return false;
      });
    },
    isGt: (first: number | string, second: number | string) => first > second,
    isGte: (first: number | string, second: number | string) => first >= second,
    isLt: (first: number | string, second: number | string) => first < second,
    isLte: (first: number | string, second: number | string) => first <= second,
    or: (...args: []) => args.some(itIt),
    and: (...args: []) => !args.some(itNIt),
    if: (condition: unknown, ifTrue: unknown, ifFalse: unknown) => (condition ? ifTrue : ifFalse),
  };

  stringTemplater<Args>(str: string, topArgs: Args, onUnknownArg?: (argName: string) => unknown) {
    const dob = '{{';
    const ocb = '}{';
    const dcb = '}}';
    const noObj = {};
    const norm = (val: unknown, op?: string) =>
      op === '?'
        ? val
          ? val
          : noObj
        : op === '!'
          ? val
            ? noObj
            : val
          : op === '!!'
            ? val == null
              ? ''
              : noObj
            : val == null
              ? noObj
              : val;
    let lim = 1000;

    const inline = (parts: unknown[]) => {
      lim--;
      if (lim < 0) return;
      let line: unknown[] = [];

      const addNorm = (val: unknown, op?: string) => {
        const value = norm(val, op);
        line = line.concat(value == noObj || value == null ? '' : value);
      };

      const getDiapason = (diapason: unknown[], district: number | null, structItems = false) => {
        let ballance: number = null as never;
        let distBallance = 0;
        let struct: unknown[] = [];
        const dists: unknown[] = [];

        const diap = (diapason[0] === dob ? diapason : []).filter(txt => {
          if (ballance === 0) return false;

          if (structItems) {
            if ((txt === ocb || txt === dcb) && ballance === 1) {
              dists.push(inline(struct));
              struct = [];
            } else if (ballance) struct.push(txt);
          } else if (district != null) {
            if (distBallance === district) dists.push(txt);
            if (ballance === 1 && txt === ocb) distBallance++;
          }

          if (txt === dob) ballance++;
          else if (txt === dcb) ballance--;

          return true;
        });

        return {
          list: structItems || district != null ? dists : diap,
          len: diap.length,
          diap,
          dists,
        };
      };

      let escLim = 0;

      parts.forEach((part, parti, parta) => {
        if (parti && parti <= escLim) return;

        const invokeFunc = (func: Function) => {
          const diapason = getDiapason(parta.slice(parti + 1), null, true);
          escLim += diapason.len;

          const nrm = inline(diapason.list) as [];
          addNorm(func.apply(this, nrm));
        };

        if (part === dob) {
        } else if (part === dcb || part === ocb) escLim++;
        else if (this.isStr(part)) {
          const match = part.match(makeRegExp('/^\\$(\\w+)(!{1,2}|\\?{1,2})?(;?)/'));
          const [, topArgName, op, semicolon] = (match || []) as [unknown, keyof StringTemplaterArgs, string, string];

          if (topArgName != null) {
            let val = topArgs[topArgName as keyof Args] as unknown;
            if (val === undefined) {
              val = this.stringTemplaterFunctions[topArgName];
              if (val === undefined && onUnknownArg) val = onUnknownArg(topArgName);
            }

            if (semicolon) {
              if (this.isFunc(val)) invokeFunc(val);
              else {
                escLim++;
                addNorm(val, op);
              }
            } else if (parta[parti + 1] === dob) {
              if (!op && this.isFunc(val)) invokeFunc(val);
              else {
                const value = norm(val, op);
                const diapason = getDiapason(parta.slice(parti + 1), value != noObj ? 0 : 1);
                escLim += diapason.len;

                addNorm(inline(diapason.list));
              }
            } else if (this.isFunc(val)) invokeFunc(val);
            else {
              parti && escLim++;
              addNorm(val, op);
            }
          } else {
            parti && escLim++;
            addNorm(part.replace(makeRegExp('/^\\\\/'), ''), op);
          }
        } else addNorm(part);
      });

      return line;
    };

    return (
      inline(
        (str || '').split(makeRegExp('/(\\\\?\\$\\w+!{0,2}\\?{0,2};?|\\\\?{{|\\\\?}{|\\\\?}})/')).filter(s => s),
      )?.join('') || ''
    );
  }

  toSorted<Item>(items: Item[], compareFunction?: (a: Item, b: Item) => number) {
    return [...items].sort(compareFunction);
  }

  withInsertedBeforei<Item>(list: Item[], beforei: number, targeti: number) {
    const fakeEvent = {} as Item;
    const [event] = list.splice(targeti, 1, fakeEvent);
    list.splice(beforei, 0, event);

    return list.filter(event => event !== fakeEvent);
  }

  sort<Item>(items: Item[], compareFunction?: (a: Item, b: Item) => number) {
    const len = items.length - 1;
    const compare =
      compareFunction !== undefined
        ? (j: number) => compareFunction(items[j], items[j + 1]) > 0
        : (j: number) => items[j] > items[j + 1];

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i; j++) {
        if (compare(j)) {
          [items[j], items[j + 1]] = [items[j + 1], items[j]];
        }
      }
    }

    return items;
  }
}

export const smylib = new SMyLib();
