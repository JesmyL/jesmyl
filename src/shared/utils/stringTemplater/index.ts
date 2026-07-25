import { makeRegExp } from 'regexpert';
import { checkIsFunction, checkIsNumber, checkIsString } from '../checkIs';
import { checkIsEq } from '../checkIsEq';
import { objectKeys, objectLength } from '../object.utils';
import { declension, itIt, itNIt } from '../utils';

export const stringTemplater = (
  str: string,
  topArgs: PRecord<string, unknown>,
  onUnknownArg?: (argName: string) => unknown,
) => {
  const symbolBoxDict: Record<string, { key: string; slashes: string; all: string; val: string }> = {};
  const symbolList: string[] = [];

  let currSymbolCode = 10000;
  let isFound = true;

  while (isFound) {
    isFound = false;

    str = str.replace(makeRegExp('/(\\\\*)\\$(\\w+){({[^{}]*})+}/g'), (all, slashes, key) => {
      isFound = true;

      const symbol = String.fromCharCode(currSymbolCode++);

      symbolBoxDict[symbol] = { all, key, slashes, val: '' };
      symbolList.unshift(symbol);

      return symbol;
    });
  }

  const allSymbols = symbolList.join('');

  const invokeIfEmptyFunc = (value: unknown) => {
    if (checkIsFunction(value)) return value();
    return value;
  };

  const stringify = (value: unknown) => {
    if (checkIsNumber(value) || checkIsString(value)) return `${value}`;
    return '';
  };

  const takeCorrectValue = (val: unknown) => {
    if (!val) return val;

    if (checkIsString(val)) {
      const varMatch = val.match(makeRegExp('/^\\$(\\w+);?$/'));

      if (varMatch) {
        return invokeIfEmptyFunc(topArgs[varMatch[1]]);
      }

      if (val in symbolBoxDict) return takeBoxValue(symbolBoxDict[val]);

      return replaceSymbolsAndVars(val);
    }

    while (checkIsFunction(val)) val = val();
    return val;
  };

  const takeBoxValue: (box: (typeof symbolBoxDict)[string]) => string = box => {
    const { all, key, slashes } = box;

    if (slashes.length % 2) return box.all;

    const args = all.slice(key.length + 3, -2);

    if (checkIsFunction(topArgs[key])) {
      return topArgs[key](...args.split('}{').map(takeCorrectValue));
    }

    if (checkIsFunction(stringTemplaterFunctions[key]))
      return stringTemplaterFunctions[key](...args.split('}{').map(takeCorrectValue));

    if (key === 'if') {
      const firstArg = args.split('}{', 1)[0];
      const condition = takeCorrectValue(firstArg);

      if (condition) {
        const ifTrue = takeCorrectValue(args.slice(firstArg.length + 2).split('}{', 1)[0]);

        return ifTrue;
      } else {
        const thirdArg = args.slice(firstArg.length + 2).split('}{', 2)[1];
        const ifFalse = takeCorrectValue(thirdArg);

        return ifFalse;
      }
    }

    return onUnknownArg?.(key);
  };

  const replaceSymbolsAndVars: (str: string) => string = str =>
    str.replace(makeRegExp(`/([${allSymbols}])|(\\\\*)(\\$(\\w+);?)/g`), (_all, symbol, slashes, whole, varKey) => {
      if (symbol) {
        return stringify(takeBoxValue(symbolBoxDict[symbol]));
      }

      if (slashes.length % 2) return whole;

      return stringify(takeCorrectValue(topArgs[varKey]));
    });

  return replaceSymbolsAndVars(str);
};

/////////////////////////////
/////////////////////////////
/////////////////////////////

const isEq = (...args: unknown[]) => {
  let val: unknown;

  return !args.some((arg, argi) => {
    if (argi) return !checkIsEq(arg, val);
    val = arg;
    return false;
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringTemplaterFunctions: Record<string, (...args: any[]) => unknown> = {
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
  declension,
  keys: objectKeys,
  join: (by: string, ...arr: []) => arr.join(by),
  len: (obj: object) => objectLength(obj),
  isEq,
  isNEq: (...args: unknown[]) => !isEq(...args),
  isGt: (first: number | string, second: number | string) => first > second,
  isGte: (first: number | string, second: number | string) => first >= second,
  isLt: (first: number | string, second: number | string) => first < second,
  isLte: (first: number | string, second: number | string) => first <= second,
  or: (...args: []) => args.some(itIt),
  and: (...args: []) => !args.some(itNIt),
};
