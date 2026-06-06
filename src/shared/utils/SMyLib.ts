import md5 from 'md5';
import { makeRegExp } from 'regexpert';
import { checkIsEq } from './checkIsEq';
import { ruLowerLettersStr, slavicLowerLettersStr } from './cm/com/const';
import { itIt, itNIt } from './utils';

export type StringTemplaterArgs<Adds = object> = {
  ink: (num: number, post: string, pre: string) => string;
  switch: () => string;
} & Adds;

const inSec = 1000;
const inMin = inSec * 60;
const inHour = inMin * 60;
const inDay = inHour * 24;

const constants = {
  REMOVE: ['REMOVE'] as const,
  POSITION: ['POSITION'] as const,
  INDEX: ['INDEX'] as const,
};

const constantPositions = [constants.INDEX, constants.POSITION];

type Trace = string | (typeof constants)[keyof typeof constants];

export class SMyLib {
  c = constants;

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
  isAFunc = (it: func | unknown): it is func =>
    this.isFunc(it) && (it as never as { [Symbol.toStringTag]: unknown })[Symbol.toStringTag] === 'AsyncFunction';
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

  toRandomSorted = <Item>(arr: Item[]) => {
    const items: Item[] = [];
    const arrClone = [...arr];

    for (let i = 0; i < arr.length; i++) items.push(arrClone.splice(this.randomOf(0, arrClone.length - 1), 1)[0]);

    return items;
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

  ellipsisText(text: string | nil, maxLen: number = 30) {
    if (!text) return '';
    const cutText = text.slice(0, maxLen);
    return `${cutText}${cutText.length !== text.length ? ' ...' : ''}`;
  }

  numberSearchReplacements: [RegExp, string][] = [
    [/0/g, '[ 0]'],
    [/1/g, `[^${ruLowerLettersStr}1`],
    [/2/g, '[абвг2]'],
    [/3/g, '[деёжз3]'],
    [/4/g, '[ийкл4]'],
    [/5/g, '[мноп5]'],
    [/6/g, '[рсту6]'],
    [/7/g, '[фхцч7]'],
    [/8/g, '[шщъы8]'],
    [/9/g, '[ьэюя9]'],
  ];

  textSearchReplacements: [RegExp, string][] = [
    [/[ыіi]/g, '[ыії]'],
    [/[ъ'ʼ]/g, "[ъ'ʼ]"],
    [/[эє]/g, '[эє]'],
    [/[гґ]/g, '[гґ]'],
    [/[её]/g, '[её]'],
  ];

  internationalWordReg(word: string, isNumberSearch?: boolean) {
    return makeRegExp(
      `/${(isNumberSearch ? this.numberSearchReplacements : this.textSearchReplacements)
        .reduce((acc, [from, to]) => acc.replace(from, to), word)
        .toLowerCase()}/`,
    );
  }

  searchRate<T, R extends { item: T; deep: number; rate: number; field: string; pos: string[] }, RetItem extends R = R>(
    items: T[],
    searchWord: string,
    places: (Trace[] | Trace)[],
    isNumberSearch?: boolean,
    mapNumListItem: (num: number) => number = itIt,
  ): RetItem[] {
    const normalWords = isNumberSearch
      ? searchWord.split(makeRegExp('/0+/')).filter(itIt)
      : searchWord.split(makeRegExp(`/[^a-z0-9'ʼ${slavicLowerLettersStr}]+/i`)).filter(itIt);
    const words = normalWords.map(word => word.toLowerCase());
    const wordRegs = normalWords.map(word => this.internationalWordReg(word, isNumberSearch));

    return items.reduce((ferries: RetItem[], item, itemi) => {
      const ferry = { item, deep: 0, rate: 0, pos: [] } as never as RetItem;

      if (
        places.some((place, placei) => {
          ferry.deep = placei;
          const index = constantPositions.indexOf(place as never);

          if (index > -1) {
            const rateIndex = words.findIndex(word =>
              word && words.length > 1
                ? `${mapNumListItem(itemi + index)}` === word
                : `${itemi + index}`.startsWith(word),
            );

            if (rateIndex > -1) {
              ferry.rate = 1;
              return true;
            }
            return false;
          }

          const searchInPlace = (searchPath: unknown[], str: string, level: number) => {
            str = str.toLowerCase();
            let noWord = false;

            const currRate = words.reduce((accRate: number | null, _word, wordi) => {
              if (noWord || !wordRegs[wordi]) return null;
              const index = str.search(wordRegs[wordi]);
              if (index < 0) {
                noWord = true;
                return null;
              }

              ferry.pos.push(searchPath.concat(index).join('/'));

              return (accRate as number) + index + level;
            }, null);

            if (noWord || currRate == null) return false;

            ferry.rate = currRate;
            return true;
          };

          const search = (searchPath: unknown[], track: Trace[] | Trace, target: unknown, level: number) => {
            let searched = false;

            [track].flat().reduce((nestedTarget, trace, tracei, tracea) => {
              if (!nestedTarget) return null;
              if (trace === constants.INDEX && this.isArr(nestedTarget)) {
                searched = nestedTarget.some((o, oi) =>
                  search(
                    searchPath.concat(`${constants.INDEX}:${oi}`),
                    track.slice(tracei + 1),
                    o,
                    (level + tracei) * 10,
                  ),
                );
                return null;
              }

              if (tracei >= tracea.length - 1) {
                searched = searchInPlace(
                  searchPath.concat(trace),
                  (nestedTarget as never as Record<string, string>)[trace as string],
                  level,
                );
              }

              return (nestedTarget as never as Record<string, string>)[trace as string];
            }, target);

            return searched;
          };

          const isSearched = search(this.isArr(place) ? [place[0]] : [], place, item, placei);

          return isSearched;
        })
      )
        ferries.push(ferry as never);

      return ferries;
    }, []);
  }

  searchRateWithSort<
    T,
    R extends { item: T; deep: number; rate: number; field: string; pos: string[] },
    RetItem extends R = R,
  >(
    items: T[],
    searchWord: string,
    places: (Trace[] | Trace)[],
    isNumberSearch?: boolean,
  ): { list: Promise<RetItem[]>; reset: () => void } {
    const { promise, reject, resolve } = Promise.withResolvers<RetItem[]>();
    const reseter: { t: TimeOut } = { t: undefined };

    const result = this.searchRate<T, R, RetItem>(items, searchWord, places, isNumberSearch);

    setTimeout(() => {
      resolve(this.qsort(result, (a, b) => a.rate - b.rate, 3, reseter));
    }, 0);

    return {
      list: promise,
      reset: () => {
        reject();
        clearTimeout(reseter.t);
      },
    };
  }

  qsort<Item>(items: Item[], compareFn?: (a: Item, b: Item) => number, interval = 0, reseter?: { t: TimeOut }) {
    compareFn ??= (a, b) => (a > b ? 1 : a === b ? 0 : -1);
    reseter ??= { t: undefined };

    const sort = async (items: Item[]): Promise<Item[]> => {
      if (items.length < 2) return items;

      const { promise, resolve } = Promise.withResolvers<Item[]>();

      reseter.t = setTimeout(async () => {
        const less = [];
        const great = [];
        const pivot = items[0];
        const list = items.slice(1);

        for (const item of list)
          if (compareFn(item, pivot) < 1) less.push(item);
          else great.push(item);

        resolve((await sort(less)).concat(pivot, await sort(great)));
      }, interval);

      return promise;
    };

    return sort(items);
  }

  clone =
    typeof structuredClone === 'function'
      ? <Val>(obj: Val, options?: Parameters<typeof structuredClone>[1]): Val => structuredClone(obj, options)
      : <Val>(what: Val): Val => {
          if (what === null || what === undefined) return what;
          else if (this.isArr(what)) {
            const arr: unknown[] = [];
            for (const key in what) arr[key] = this.clone(what[key]);
            return arr as Val;
          } else if (what.constructor === Object) {
            const obj: Record<string, unknown> = {};
            for (const key in what) obj[key] = this.clone(what[key]);
            return obj as Val;
          }

          return what;
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

  isEq = checkIsEq;

  md5(content: string) {
    return md5(content);
  }

  declension(num: number, one?: string, two?: string, five?: string) {
    if (num % 1) return two!;
    let absNum = Math.abs(num) % 100;

    if (absNum > 10 && absNum < 20) return five ?? two!;

    absNum %= 10;

    return absNum > 1 && absNum < 5 ? two! : absNum === 1 ? one! : (five ?? two!);
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

          addNorm(func.apply(this, inline(diapason.list) as never));
        };

        if (part === dob) {
          console.info();
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
              if (parti) escLim++;
              addNorm(val, op);
            }
          } else {
            if (parti) escLim++;
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
    list = [...list];
    const event = list.splice(targeti, 1, fakeEvent)[0];
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

export const smylib = new SMyLib();
