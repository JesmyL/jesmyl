import { makeRegExp } from 'regexpert';
import { checkIsFunction, checkIsNotFunction, checkIsNumber, checkIsStartsWith, checkIsString } from '../checkIs';
import { checkIsEq } from '../checkIsEq';
import { declension } from '../utils';
import * as concepts from './concepts';
import { stringTemplaterSrartSymbolCharCode, strTplArgLastEdge, strTplArgSeparator, strTplSysLen } from './const';

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

export const stringTemplater = (
  str: string,
  topArgs: PRecord<string, unknown>,
  onUnknownArg?: (argName: string) => unknown,
) => {
  const symbolBoxDict: Record<string, { key: keyof typeof concepts; all: string }> = {};
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
        const code = val.codePointAt(0);
        if (
          code !== undefined &&
          code >= stringTemplaterSrartSymbolCharCode &&
          code < endCode &&
          val in symbolBoxDict
        ) {
          return takeBoxValue(symbolBoxDict[val]);
        }
      }

      return replaceSymbolsAndVars(val);
    }

    while (checkIsFunction(val)) val = val();
    return val;
  };

  const takeBoxValue: (box: (typeof symbolBoxDict)[string]) => unknown = box => {
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
    let position = 0;
    let hasMoreArgs = args.length > 0;

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
        if (char in symbolBoxDict) {
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
  const result = replaceSymbolsAndVars(preparedStr);

  return result.split(escapeMarker).join('$');
};

const randomSalt = Math.floor(Math.random() * 1000000);
const escapeMarker = `\x00_${randomSalt}_\x00`;
