import { makeRegExp } from 'regexpert';
import { checkIsFunction, checkIsNotFunction, checkIsNumber, checkIsStartsWith, checkIsString } from '../checkIs';
import { checkIsEq } from '../checkIsEq';
import * as concepts from './concepts';
import { stringTemplaterSrartSymbolCharCode, strTplArgLastEdge, strTplArgSeparator, strTplSysLen } from './const';

export * from './concepts';

/** replace simple $ -> $; */
export const stringTemplater = (
  str: string,
  topArgs: PRecord<string, unknown>,
  onUnknownArg?: (argName: string) => unknown,
) => {
  const symbolBoxDict: Record<string, { key: keyof typeof concepts; all: string }> = {};
  const symbolList: string[] = [];

  let currSymbolCode = stringTemplaterSrartSymbolCharCode;
  const takeNextSymbol = () => String.fromCharCode(currSymbolCode++);
  let isFound = true;

  const replaceBoxes = (all: string, key: string) => {
    isFound = true;

    const symbol = takeNextSymbol();

    symbolBoxDict[symbol] = { all, key: key as never };
    symbolList.unshift(symbol);

    return symbol;
  };

  while (isFound) {
    isFound = false;
    str = str.replace(makeRegExp('/\\$(\\w+){({[^{}]*})+}/g'), replaceBoxes);
  }

  const allSymbols = symbolList.join('');

  const invokeIfEmptyFunc = (value: unknown) => {
    if (checkIsFunction(value)) return value();
    return value;
  };

  const stringify = (value: unknown) => {
    if ((checkIsNumber(value) && !isNaN(value)) || checkIsString(value)) return `${value}`;
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
    const { all, key } = box;

    const args = all.slice(key.length + strTplSysLen, -strTplArgLastEdge.length);

    let func: unknown = topArgs[key];

    if (checkIsNotFunction(func) && checkIsStartsWith(key, 'is')) {
      const prop = key.slice(2) as keyof typeof isUtilConceptResultDict;
      func = isUtilConceptResultDict[prop];
    }

    if (checkIsFunction(func)) return func(...args.split(strTplArgSeparator).map(takeCorrectValue));

    let floatArgs = args;
    let argi = -1;
    let takePrevValue = () => ({ v: NaN as unknown });
    let firstValue: { v: unknown };

    do {
      argi++;
      const arg = floatArgs.split(strTplArgSeparator, 1)[0];
      floatArgs = floatArgs.slice(calculateArgLen(arg));

      firstValue ??= { v: takeCorrectValue(arg) };

      switch (key) {
        case 'IF': {
          if (argi === 1 && firstValue.v) return takeCorrectValue(arg);
          if (argi === 2) return takeCorrectValue(arg);
          break;
        }
        case 'SWITCH': {
          if (!floatArgs) return takeCorrectValue(arg);
          if (argi && !(argi % 2) && firstValue.v === takePrevValue().v) return takeCorrectValue(arg);

          let prevValue: { v: unknown };
          takePrevValue = () => (prevValue ??= { v: takeCorrectValue(arg) });

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
        case 'toNUM': {
          return parseFloat(takeCorrectValue(arg));
        }
        case 'toSTR': {
          return JSON.stringify(takeCorrectValue(arg));
        }

        case 'FN':
        case 'STR':
        case 'isUtil':
          break;

        default: {
          const _never: never = key;
        }
      }
    } while (floatArgs);

    return onUnknownArg?.(key);
  };

  const reg = makeRegExp(`/([${allSymbols}])|\\$(\\w+);?/g`);
  const rep = (_all: string, symbol: string, varKey: string) => {
    if (symbol) return stringify(takeBoxValue(symbolBoxDict[symbol]));
    return stringify(takeCorrectValue(topArgs[varKey]));
  };

  const replaceSymbolsAndVars: (str: string) => string = str => str.replace(reg, rep);

  const escapeSymbol = takeNextSymbol();

  return replaceSymbolsAndVars(str.replace(makeRegExp('/\\$;/g'), escapeSymbol)).replace(
    makeRegExp(`/${escapeSymbol}/g`),
    '$',
  );
};

const calculateArgLen = (arg: string) => arg.length + strTplArgSeparator.length;

const isUtilConceptResultDict: Record<keyof typeof concepts.isUtil, (arg1: unknown, arg2: unknown) => boolean> = {
  EQ: checkIsEq,
  NEQ: (arg1, arg2) => !checkIsEq(arg1, arg2),
  GT: (arg1, arg2) => (arg1 as number) > (arg2 as number),
  GTE: (arg1, arg2) => (arg1 as number) >= (arg2 as number),
  LT: (arg1, arg2) => (arg1 as number) < (arg2 as number),
  LTE: (arg1, arg2) => (arg1 as number) <= (arg2 as number),
};
