/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeRegExp } from 'regexpert';
import { checkIsFunction, checkIsNotFunction, checkIsNumber, checkIsStartsWith, checkIsString } from '../checkIs';
import { checkIsEq } from '../checkIsEq';
import { declension } from '../utils';
import * as concepts from './concepts';
import { stringTemplaterSrartSymbolCharCode, strTplArgLastEdge, strTplArgSeparator, strTplSysLen } from './const';
import { StringTemplaterInterpolation, StringTemplaterWithTwoInterpolations } from './model';

export * from './concepts';

const BOX_REGEXP = makeRegExp('/\\$(\\w+){({[^{}]*})+}/g');
const VAR_EXACT_REGEXP = makeRegExp('/^\\$(\\w+);?$/');
const VAR_GLOBAL_REGEXP = makeRegExp('/\\$(\\w+);?/g');
const ESCAPE_INPUT_REGEXP = makeRegExp('/\\$;/g');

const TOKENS_REGEXP = makeRegExp(`/[\\u${stringTemplaterSrartSymbolCharCode.toString(16)}-\\u{10FFFF}]/gu`);

const isUtilConceptResultDict: Record<keyof typeof concepts.isUtil, (arg1: unknown, arg2: unknown) => boolean> = {
  EQ: checkIsEq,
  NEQ: (arg1, arg2) => !checkIsEq(arg1, arg2),
  GT: (arg1, arg2) => (arg1 as number) > (arg2 as number),
  GTE: (arg1, arg2) => (arg1 as number) >= (arg2 as number),
  LT: (arg1, arg2) => (arg1 as number) < (arg2 as number),
  LTE: (arg1, arg2) => (arg1 as number) <= (arg2 as number),
};

const defaultFunctions: Record<string, Function> = {
  declension,
};

const invokeIfEmptyFunc = (value: unknown) => {
  if (checkIsFunction(value)) return value();
  return value;
};

const stringify = (value: unknown) => {
  if (checkIsNumber(value) && !isNaN(value)) return `${value}`;
  if (checkIsString(value)) return value;
  return '';
};

type NEXTcb<Key extends string, Ret = unknown> = (key: Key, value: string, index: number) => Ret;

export const stringTemplater: <
  const Str extends StringTemplaterInterpolation<string, string> | StringTemplaterWithTwoInterpolations<string, string>,
  const GenKey extends Str extends StringTemplaterInterpolation<string, infer K>
    ? K
    : Str extends StringTemplaterWithTwoInterpolations<string, string, infer K>
      ? K
      : string,
  const TopArgs extends PRecord<string, unknown> & { NEXT?: NEXTcb<GenKey> },
  Ret extends TopArgs extends { NEXT: NEXTcb<GenKey, infer R> } ? R[] : string,
>(
  str: string,
  topArgs: TopArgs,
  onUnknownArg?: (argName: string) => unknown,
) => Ret = (str, topArgs, onUnknownArg) => {
  type Box = { key: keyof typeof concepts; all: string };
  const symbolBoxDict: PRecord<string, Box> = {};
  let currSymbolCode = stringTemplaterSrartSymbolCharCode;

  const takeNextSymbol = () => String.fromCodePoint(currSymbolCode++);
  let isFound = true;

  while (isFound) {
    isFound = false;
    str = str.replace(BOX_REGEXP, (all: string, key: string) => {
      isFound = true;
      const symbol = takeNextSymbol();
      symbolBoxDict[symbol] = { all, key: key as never };
      return symbol;
    });
  }

  const endCode = currSymbolCode;

  const takeCorrectValue = (val: unknown) => {
    if (!val) return val;

    if (checkIsString(val)) {
      if (checkIsStartsWith(val, '$')) {
        const varMatch = val.match(VAR_EXACT_REGEXP);
        if (varMatch) {
          return invokeIfEmptyFunc(topArgs[varMatch[1]]);
        }
      }

      if (val.length === 1) {
        const box = symbolBoxDict[val];
        const code = val.codePointAt(0);
        if (box && code !== undefined && code >= stringTemplaterSrartSymbolCharCode && code < endCode) {
          return takeBoxValue(box);
        }
      }

      return replaceSymbolsAndVars(val);
    }

    while (checkIsFunction(val)) val = val();
    return val;
  };

  const takeBoxValue: (box: Box) => unknown = box => {
    const { all, key } = box;
    const args = all.slice(key.length + strTplSysLen, -strTplArgLastEdge.length);

    let func: unknown = topArgs[key] ?? defaultFunctions[key];

    if (checkIsNotFunction(func) && checkIsStartsWith(key, 'is')) {
      const prop = key.slice(2) as keyof typeof isUtilConceptResultDict;
      func = isUtilConceptResultDict[prop];
    }

    func ??= Math[key as 'abs'];

    if (checkIsFunction(func)) {
      return func(...args.split(strTplArgSeparator).map(takeCorrectValue));
    }

    let argi = -1;
    let index = 0;
    let position = 0;
    let hasMoreArgs = args.length > 0;
    let result: any;

    let cachedPrevValue: { v: unknown } | null = null;
    let selectorValue: { v: unknown } | null = null;

    while (hasMoreArgs) {
      argi++;

      const nextSeparatorIndex = args.indexOf(strTplArgSeparator, position);
      let arg: string;

      if (nextSeparatorIndex === -1) {
        arg = args.slice(position);
        hasMoreArgs = false;
      } else {
        arg = args.slice(position, nextSeparatorIndex);
        position = nextSeparatorIndex + strTplArgSeparator.length;
      }

      switch (key) {
        case 'IF': {
          if (argi === 0) {
            selectorValue = { v: takeCorrectValue(arg) };
          } else if (argi === 1) {
            if (selectorValue?.v) return takeCorrectValue(arg);
          } else if (argi === 2) {
            if (!selectorValue?.v) return takeCorrectValue(arg);
          }
          break;
        }
        case 'SWITCH': {
          if (argi === 0) {
            selectorValue = { v: invokeIfEmptyFunc(takeCorrectValue(arg)) };
            break;
          }

          if (!hasMoreArgs) {
            return argi % 2 ? takeCorrectValue(arg) : '';
          }

          if (argi % 2 === 0) {
            const prevVal = cachedPrevValue ? cachedPrevValue.v : NaN;
            if (checkIsEq(selectorValue?.v, invokeIfEmptyFunc(prevVal))) {
              return takeCorrectValue(arg);
            }
          }

          if (argi % 2 === 1) {
            cachedPrevValue = { v: takeCorrectValue(arg) };
          }
          break;
        }
        case 'GENERATE': {
          if (!('NEXT' in topArgs && checkIsFunction(topArgs.NEXT))) return '';

          result ??= [];

          if (argi % 2 === 1) {
            result.push(topArgs.NEXT(stringify(cachedPrevValue?.v) as never, takeCorrectValue(arg), index++));
          } else {
            cachedPrevValue = { v: takeCorrectValue(arg) };
          }

          if (hasMoreArgs) break;
          return result;
        }
        case 'AND': {
          const value = takeCorrectValue(arg);
          if (!value) return value;
          break;
        }
        case 'OR': {
          const value = takeCorrectValue(arg);
          if (value) return value;
          break;
        }
        case 'toNUM':
          return parseFloat(takeCorrectValue(arg) as string);

        case 'toSTR':
          return JSON.stringify(takeCorrectValue(arg));

        default:
          break;
      }
    }

    return onUnknownArg?.(key);
  };

  const replaceSymbolsAndVars = (inputStr: string) => {
    let currentStr = inputStr;

    if (stringTemplaterSrartSymbolCharCode !== endCode) {
      currentStr = currentStr.replace(TOKENS_REGEXP, char => {
        if (symbolBoxDict[char]) {
          return stringify(takeBoxValue(symbolBoxDict[char]));
        }
        return char;
      });
    }

    currentStr = currentStr.replace(VAR_GLOBAL_REGEXP, (_, varKey) => {
      if (varKey in topArgs) {
        return stringify(takeCorrectValue(topArgs[varKey]));
      }
      return '';
    });

    return currentStr;
  };

  const preparedStr = str.replace(ESCAPE_INPUT_REGEXP, escapeMarker);

  if (symbolBoxDict[preparedStr]?.key === 'GENERATE') {
    return takeBoxValue(symbolBoxDict[preparedStr]) as never;
  }

  const result = replaceSymbolsAndVars(preparedStr);

  return result.split(escapeMarker).join('$') as never;
};

const randomSalt = Math.floor(Math.random() * 1000000);
const escapeMarker = `\x00_${randomSalt}_\x00`;
