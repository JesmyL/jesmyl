import { makeRegExp } from 'regexpert';
import { checkIsFunction, checkIsNil, checkIsString } from '../checkIs';
import { checkIsEq } from '../checkIsEq';
import { objectKeys, objectLength } from '../object.utils';
import { declension, itIt, itNIt } from '../utils';

export type StringTemplaterArgs<Adds = object> = {
  ink: (num: number, post: string, pre: string) => string;
  switch: () => string;
} & Adds;

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

export const stringTemplater = <Args>(str: string, topArgs: Args, onUnknownArg?: (argName: string) => unknown) => {
  let lim = 1000;

  const inline = (parts: unknown[]) => {
    lim--;
    if (lim < 0) return;
    let line: unknown[] = [];

    const addNorm = (val: unknown, op?: string) => {
      const value = norm(val, op);
      line = line.concat(value == noObj || checkIsNil(value) ? '' : value);
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
        //
      } else if (part === dcb || part === ocb) escLim++;
      else if (checkIsString(part)) {
        const match = part.match(makeRegExp('/^\\$(\\w+)(!{1,2}|\\?{1,2})?(;?)/'));
        const [, topArgName, op, semicolon] = (match || []) as [unknown, keyof StringTemplaterArgs, string, string];

        if (topArgName != null) {
          let val = topArgs[topArgName as keyof Args] as unknown;
          if (val === undefined) {
            val = stringTemplaterFunctions[topArgName];
            if (val === undefined && onUnknownArg) val = onUnknownArg(topArgName);
          }

          if (semicolon) {
            if (checkIsFunction(val)) invokeFunc(val);
            else {
              escLim++;
              addNorm(val, op);
            }
          } else if (parta[parti + 1] === dob) {
            if (!op && checkIsFunction(val)) invokeFunc(val);
            else {
              const value = norm(val, op);
              const diapason = getDiapason(parta.slice(parti + 1), value != noObj ? 0 : 1);
              escLim += diapason.len;

              addNorm(inline(diapason.list));
            }
          } else if (checkIsFunction(val)) invokeFunc(val);
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
};

/////////////////////////////
/////////////////////////////
/////////////////////////////

const stringTemplaterFunctions = {
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
  isEq: (...args: unknown[]) => {
    let val: unknown;

    return !args.some((arg, argi) => {
      if (argi) return !checkIsEq(arg, val);
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
