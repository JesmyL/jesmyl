/* eslint-disable eqeqeq */
import {
  ActionBoxSetSystems,
  ActionBoxSetSystemsFree,
  ExecuteDoItProps,
  ExecuterSetInEachValueItem,
  ExecutionArgs,
  ExecutionExpectations,
  ExecutionReal,
  ExecutionTrack,
  LocalSokiAuth,
  RealAccumulatableRuleSides,
  TrackerRet,
} from 'shared/api';
import { makeRegExp, SMyLib, smylib } from 'shared/utils';
import { actionBoxSetSystems } from 'shared/values';

const globs: Record<string, any> = {
  'setNewWid()': () => new Date().getTime() + Math.random(),
  'DateNow()': () => Date.now(),
};

export class ExecuterBasics {
  static readonly stubEmpty = ['EMPTY'];

  static getIfGlob(field: string, ...defs: any[]) {
    const def = defs.length ? defs[0] : field;

    if (!smylib.isStr(field) || field[0] !== '@') {
      return def;
    } else {
      return this.getGlob(field.slice(1), def);
    }
  }

  static getGlob(globName: string, ...args: any) {
    if (globName[0] === '@') globName = globName.slice(1);

    const track = smylib.explode(':', globName, 2);
    const traces = smylib.explode('.', track[0]);
    const name = traces[0];

    if (globs[name]) {
      if (traces.length < 2) {
        const glob = globs[name];
        let result = glob;

        if (smylib.isFunc(glob)) {
          if (track[1]) {
            const args = smylib.explode(':', track[1]);
            result = glob(...args);
          } else result = glob();
        }

        return result;
      } else {
        const parents = {};
        const parent = this.tracker(traces, parents, null, globs)['target'];

        if (track.length > 1) {
          track[1] = JSON.parse(track[1]);
          return this.tracker(track, parents, null, parent)['target'];
        } else return parent;
      }
    } else return args[1];
  }

  static executeReals(contents: Record<string, any>, execs: ExecutionReal[]) {
    return new Promise<string[]>((resolve, reject) => {
      const fixes: string[] = [];

      if (execs.length === 0) resolve(fixes);

      execs.forEach(exec => {
        const firstTrace = exec.track[0];
        if (smylib.isStr(firstTrace) && !fixes.includes(firstTrace)) fixes.push(firstTrace);
        const { penultimate, target, lastTrace } = this.checkExpecteds(exec.track, contents, exec.expecteds);

        this.setSystemsValues(target, exec.value, exec.setSystems, exec.setItemSystems);
        this.setInEachValueItem(penultimate, exec.setEachInParent, exec.args);

        this.doIt({
          method: exec.method,
          target,
          penultimate,
          lastTrace,
          value: exec.value,
          uniqs: exec.uniqs,
        })
          .then(() => {
            if (exec.sides)
              this.execSides(exec.track, exec.sides, contents, exec.args)
                .then(() => resolve(fixes))
                .catch(errorMessage => reject(errorMessage));
            else resolve(fixes);
          })
          .catch(errorMessage => reject(errorMessage));
      });
    });
  }

  static execSides(
    topTrack: ExecutionTrack,
    sides: RealAccumulatableRuleSides | undefined,
    contents: Record<string, unknown>,
    realArgs?: ExecutionArgs,
    auth?: LocalSokiAuth | null,
    { shortTitle, title }: { shortTitle?: string; title?: string | ((args: Record<string, unknown>) => string) } = {},
  ) {
    return new Promise<boolean>((resolve, reject) => {
      sides = smylib.isFunc(sides) ? (this.replaceArgs(sides, realArgs, auth) as never) : sides;
      sides = this.replaceArgs(sides, realArgs, auth);

      sides?.some(({ method, value, args, trackTail }) => {
        if (trackTail) {
          const track = topTrack.slice(0, trackTail[0]).concat(trackTail[1]);
          const { lastTrace, penultimate, target } = this.tracker(track, contents, args, undefined, auth);
          const titleScalar = shortTitle || title;

          if (value === this.stubEmpty) {
            reject(
              `Неизвестное значение попутных модификаций ${lastTrace} для действия "${
                (titleScalar && (smylib.isStr(titleScalar) ? titleScalar : args ? titleScalar(args) : '')) || shortTitle
              }"`,
            );
            return true;
          }

          this.doIt({
            method,
            target,
            penultimate,
            lastTrace,
            value,
            realArgs: args,
            auth,
          })
            .then(resolve)
            .catch(errorMessage => reject(`#63674012239 ${errorMessage}`));
        }

        return false;
      });
    });
  }

  static setInEachValueItem(
    value: unknown,
    forces?: ExecuterSetInEachValueItem,
    realArgs?: ExecutionArgs,
    auth?: LocalSokiAuth | null,
  ) {
    if (!forces) return;

    SMyLib.entries(forces).forEach(([tracky, setts]) => {
      const setDeepper = (trackys: string[], deepItem: unknown) => {
        if (!trackys.length) {
          if (smylib.isObj(deepItem))
            SMyLib.entries(this.replaceArgs(smylib.clone(setts), realArgs, auth)).forEach(
              ([key, val]) => (deepItem[key] = val),
            );
          else if (smylib.isArr(deepItem)) deepItem.forEach(nextItem => setDeepper([], nextItem));
          return;
        }

        const [trackBeat] = trackys;

        if (smylib.isObj(deepItem)) setDeepper(trackys.slice(1), deepItem[trackBeat]);

        if (smylib.isArr(deepItem)) {
          const nextTracky = trackys.slice(1);
          deepItem.forEach(nextItem => setDeepper(nextTracky, nextItem[trackBeat]));
        }
      };

      tracky.split(makeRegExp('/\\s*,\\s*/')).forEach(trackyBeat => {
        if (trackyBeat === '.') setDeepper([], value);
        else setDeepper(trackyBeat.split('.'), value);
      });
    });
  }

  static setSystemsValues(
    list: any[] | undefined,
    value: any,
    systems?: ActionBoxSetSystems[],
    itemSystems?: ActionBoxSetSystems[],
  ) {
    systems?.forEach(mapperName => {
      const [name, sName] = mapperName.split(':') as [ActionBoxSetSystemsFree, string];
      const realName = sName || name;

      list?.forEach(li => {
        if (li[realName] == null) {
          const result = actionBoxSetSystems[name]?.(realName, list);
          if (result !== undefined && li[realName] === undefined) li[realName] = result;
        }
      });

      const result = actionBoxSetSystems[name]?.(realName, list);
      if (result !== undefined && value[realName] === undefined) value[realName] = result;
    });

    if (smylib.isArr(value)) {
      itemSystems?.forEach(mapperName => {
        const [name, sName] = mapperName.split(':') as [ActionBoxSetSystemsFree, string];
        const realName = sName || name;
        value.forEach(value => {
          const result = actionBoxSetSystems[name]?.(realName, list);
          if (result !== undefined) {
            value[realName] = result;
            list = (list || []).concat(value);
          }
        });
        return;
      });
    }
  }

  static checkExpecteds(
    track: ExecutionTrack,
    contents: Record<string, unknown>,
    expecteds?: ExecutionExpectations,
    args?: Record<string, unknown>,
  ) {
    let trackered = this.tracker(track, contents, args);

    if (trackered.target == null && expecteds) {
      expecteds.forEach(([trackEnd, expected]) => {
        const { penultimate, target, lastTrace } = this.tracker(track.slice(0, trackEnd), contents, args);
        if (target == null && penultimate) penultimate[lastTrace] = smylib.clone(expected);
      });

      return this.tracker(track, contents, args);
    }
    return trackered;
  }

  static tracker(
    track: ExecutionTrack,
    parents: Record<string, unknown>,
    realArgs?: Record<string, unknown> | null,
    topParent?: Record<string, Object> | null,
    auth?: LocalSokiAuth | null,
  ): TrackerRet {
    const targets: any[] = topParent ? [topParent] : [];

    for (let tracei = 0; tracei < track.length; tracei++) {
      const trace = track[tracei];
      const target = targets[targets.length - 1];

      if (tracei === 0) {
        if (topParent) continue;
        if (smylib.isStr(trace)) targets.push(parents[trace]);
        else if (!Array.isArray(trace)) targets.push(trace);

        continue;
      } else if (trace === '.') continue;

      if (target == null)
        return {
          parent: null,
          target: null,
          penultimate: targets[targets.length - 2],
          lastTrace: track[track.length - 1] as string,
        };

      if (Array.isArray(trace)) {
        if (Array.isArray(target)) {
          const val = target.find(val => this.isExpected(val, trace, realArgs, auth));
          targets.push(val);
          continue;
        }
      } else targets.push(target[trace]);
    }

    return {
      parent: targets[0],
      target: targets[targets.length - 1],
      penultimate: targets[targets.length - 2],
      lastTrace: track[track.length - 1] as string,
    };
  }

  static isExpected(
    source: Record<string, unknown>,
    inspector: (number | string | (number | string)[])[],
    args?: ExecutionArgs | null,
    auth?: LocalSokiAuth | null,
  ): boolean {
    if (inspector == null) return false;

    if (smylib.isobj(inspector)) {
      if (Array.isArray(inspector)) {
        const valLen = inspector.length;

        if (valLen === 1) return !!inspector[0];
        else if (valLen > 2) {
          let happensCount = 0;
          let wholeCount = 0;
          let prevLogicEnd: '' | '&' | '|' = '';

          for (let i = 0; i < valLen; i += 3) {
            wholeCount += 1;

            const field = this.replaceArgs(inspector[i], args, auth, () => this.getAttribute(source, inspector[i]));
            let operator = inspector[i + 1];
            const sign = this.replaceArgs(inspector[i + 2], args, auth);
            let result = false;

            if (smylib.isStr(operator)) {
              const logicEnd = operator[operator.length - 1] as '|' | '&';
              const logicStart = operator[0];
              const logics = ['&', '|', '(', ')'];
              const logicBrackets = ['(', ')'];

              if (logics.indexOf(logicStart) > -1) operator = operator[1];
              if (logicEnd && logics.indexOf(logicEnd) > -1) operator = operator?.slice(0, -1);

              if (operator === '==') result = field == sign;
              else if (operator === '===') result = field === sign;
              else if (operator === '>=') result = field >= sign;
              else if (operator === '<=') result = field <= sign;
              else if (operator === '!=') result = field != sign;
              else if (operator === '!==') result = field !== sign;
              else if (operator === '<') result = field < sign;
              else if (operator === '>') result = field > sign;
              else if (operator === 'is' || operator === 'not') {
                const isNot = operator === 'not';

                result =
                  sign === 'Truthy'
                    ? isNot
                      ? !field
                      : !!field
                    : sign === 'Falsy'
                      ? isNot
                        ? !!field
                        : !field
                      : isNot
                        ? !this.isCorrectType(field, sign)
                        : this.isCorrectType(field, sign);
              } else if ((operator === 'in' || operator === 'out') && smylib.isArr(sign)) {
                return operator === 'in' ? sign.includes(field) : !sign.includes(field);
              }

              if (result) {
                if (logicEnd === '|' || prevLogicEnd === '|') return true;
                else happensCount++;
              } else if (logicEnd === '&' || logicStart === '&' || prevLogicEnd === '&') return false;

              if (logicEnd && logicBrackets.indexOf(logicEnd) < 0 && logics.indexOf(logicEnd) > -1)
                prevLogicEnd = logicEnd;
            }
          }

          return !!(wholeCount && happensCount === wholeCount);
        }
      } else {
        for (const key in inspector as {}) {
          const tern = 'WHEN';
          if (key === tern) {
            const num = this.isExpected(source, inspector[tern][0], args, auth) ? 1 : 2;

            return this.isExpected(source, inspector[tern][num], args, auth);
          } else if (source[key] !== inspector[key]) return false;
        }
        return true;
      }
    } else return inspector;

    return false;
  }

  static isCorrectType(value: any, typer: number | string | (string | number)[]): boolean {
    if (smylib.isStr(typer)) {
      if (typer[0] === '#') {
        const explodes = smylib.explode(':', typer, 2);
        const type = explodes[0]?.slice(1);
        if (type) {
          const lower = type.toLowerCase();

          if ((lower === type && value == null) || lower === 'any') return true;

          let isCorrect = false;

          if (lower === 'list') isCorrect = smylib.isArr(value);
          else if (lower === 'dict') isCorrect = smylib.isObj(value);
          else if (lower === 'object') isCorrect = smylib.isobj(value);
          else if (lower === 'string') isCorrect = smylib.isStr(value);
          else if (lower === 'str') isCorrect = value === '' || value === '1';
          else if (lower === 'number') isCorrect = smylib.isNum(value);
          else if (lower === 'num') isCorrect = value === 0 || value === 1;
          else if (lower === 'boolean') isCorrect = smylib.isBool(value);
          else if (lower === 'simple') isCorrect = smylib.isStr(value) || smylib.isNum(value);
          else if (lower === 'primitive')
            isCorrect = smylib.isBool(value) || smylib.isStr(value) || smylib.isNum(value);

          return isCorrect;
        }
      } else if (typer.startsWith('/') && typer.endsWith('/')) {
        return !!typer.match(value);
      } else return value === typer;
    } else if (smylib.isobj(typer)) {
      for (const typn in typer) if (smylib.typeOf(value) !== smylib.typeOf(typer[typn])) return false;
      return true;
    } else if (value === typer) return true;

    return false;
  }

  static replaceArgs<Value, Ret extends Value extends Function ? Value | undefined : Value>(
    value: Value,
    realArgs?: ExecutionArgs | null,
    auth?: LocalSokiAuth | null,
    defCb?: () => Value,
  ): Ret {
    if (smylib.isFunc(value)) {
      try {
        return value(realArgs, auth);
      } catch (error) {
        return (defCb ? defCb() : undefined) as never;
      }
    } else if (smylib.isStr(value)) {
      if (value.includes('{') && value.includes('}')) {
        let val: any = this.stubEmpty;
        const text = value.replace(makeRegExp('/\\{(([@*?])?([$\\w]+(\\(\\))?))\\}/g'), (all, name, prefix, key) => {
          val =
            prefix === '@'
              ? this.getIfGlob(name)
              : prefix === '*'
                ? auth?.[key as never]
                : realArgs != null
                  ? realArgs[key] ?? realArgs.$$vars?.[key as '$$currentValue']
                  : null;
          return val ?? all ?? '';
        });
        if (val === this.stubEmpty && defCb) return defCb() as never;
        return value.match(makeRegExp('/{|}/g'))?.length === 2 && value.match(makeRegExp('/^{|}$/g'))?.length === 2
          ? val
          : text;
      } else return (defCb ? defCb() : value) as never;
    } else if (smylib.isobj(value)) {
      const newValue = smylib.newInstance(value) as Record<string, any>;

      for (const key in value) {
        const val = this.replaceArgs(value[key], realArgs, auth);

        if (val !== undefined) {
          const arg = this.replaceArgs(key, realArgs, auth);
          if (arg != null) newValue[arg] = val;
          else newValue[key] = val;
        }
      }

      return newValue as never;
    }

    return (defCb ? defCb() : value) as never;
  }

  static doIt({ method, target, penultimate, lastTrace, value, realArgs, auth, uniqs }: ExecuteDoItProps) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        if (method === 'delete') {
          if (penultimate) delete penultimate[lastTrace];
          resolve(true);
          return;
        }

        if (value === undefined) {
          resolve(false);
          return;
        }

        if (method.startsWith('setOrPush')) {
          const key = method.slice(10);
          if (key && smylib.isArr(target) && value != null && value[key] != null) {
            const val = value[key];
            const index = target.findIndex(item => item[key] === val);

            if (index < 0) target.push(value);
            else target[index] = value;
          }
        } else {
          switch (method) {
            case 'set':
              if (penultimate) penultimate[lastTrace] = smylib.clone(value);
              break;
            case 'set_all':
              if (target) SMyLib.entries(smylib.clone(value)).forEach(([key, val]) => (target[key] = val));
              break;
            case 'formula':
              try {
                if (penultimate && smylib.isStr(value)) {
                  const val = this.replaceArgs(value, realArgs, auth);
                  if (smylib.isStr(val)) {
                    const body = val
                      .replace(makeRegExp('/[^()X\\d-+* /]/g'), '')
                      .replace(makeRegExp('/X/g'), '' + (target || 0));
                    const data: { result?: number } = {};
                    // eslint-disable-next-line no-new-func
                    new Function('data', `data.result = ${body};`)(data);
                    if (data.result != null) penultimate[lastTrace] = data.result;
                  }
                }
              } catch (e) {
                console.error(e);
              }
              break;
            case 'push': {
              const pushTarget = smylib.isArr(target) ? target : (penultimate[lastTrace] = []);
              const val = this.filterUniqs(uniqs, pushTarget, value);
              if (val == null) break;

              pushTarget?.push(smylib.clone(val));
              break;
            }
            case 'toggle_existance':
              if (!smylib.isArr(target)) {
                reject(`Целевой объект (${smylib.typeOf(target)?.replace('is', '')}) не является массивом`);
                break;
              }

              if (target.includes(value)) target.splice(target.indexOf(value), 1);
              else target?.push(smylib.clone(value));
              break;
            case 'toggle_by':
              if (!smylib.isArr(target)) {
                reject(`Целевой объект (${smylib.typeOf(target)?.replace('is', '')}) не является массивом`);
                break;
              }
              if (value == null || !smylib.isStr(value.by)) {
                reject('Отсутствует аргумент by#String');
                break;
              }
              const { by, val } = value;
              const itemi = target.findIndex(item => item[by] === val);

              if (itemi > -1) target.splice(itemi, 1);
              else target?.push(smylib.clone(value));
              break;
            case 'move_beforei': {
              if (!smylib.isArr(target) || value == null) break;
              const { find, beforei } = value;
              if (!smylib.isArr(find) || !smylib.isNum(beforei)) break;
              const spreadTarget = [...target];
              const index = spreadTarget.findIndex(item => this.isExpected(item, find));
              const [item] = spreadTarget.splice(index, 1, insertBeforeiFakeArr);
              spreadTarget.splice(beforei, 0, item);

              penultimate[lastTrace] = spreadTarget.filter(insertBeforeiItIt);
              break;
            }
            case 'insert_before_item_or_push': {
              if (!smylib.isArr(target) || value == null) break;
              const { findAfterItem, insertValue } = value;

              if (smylib.isArr(findAfterItem)) {
                const spreadTarget = [...target];
                const index = spreadTarget.findIndex(item => this.isExpected(item, findAfterItem));

                if (index < 0) break;

                spreadTarget.splice(index, 0, insertValue);
                penultimate[lastTrace] = spreadTarget;
              } else {
                penultimate[lastTrace].push(insertValue);
              }

              break;
            }
            case 'concat':
              const concatTarget = smylib.isArr(target) ? target : (penultimate[lastTrace] = []);
              if (smylib.isArr(value)) {
                const val: [] = this.filterUniqs(uniqs, concatTarget, value);
                if (val == null) break;
                concatTarget.push(...smylib.clone(val));
              }
              break;
            case 'remove':
              if (smylib.isArr(target) && value != null)
                if (smylib.isNum(value)) target.splice(value, 1);
                else {
                  const valuei = target.findIndex((source: any) => this.isExpected(source, value, realArgs));
                  if (valuei > -1) target.splice(valuei, 1);
                }
              break;
            case 'remove_each':
              if (smylib.isArr(target) && value != null) {
                penultimate[lastTrace] = target.filter((source: any) => !this.isExpected(source, value, realArgs));
              }
              break;
            case 'resort':
              if (smylib.isArr(penultimate) && smylib.isArr(value)) {
                penultimate.sort((a: any, b: any) => value.indexOf(a[lastTrace]) - value.indexOf(b[lastTrace]));
              }
              break;
            default:
              reject(`Неизвестный метод ${method}`);
              break;
          }
        }

        resolve(true);
      } catch (e) {
        reject('' + e);
      }
    });
  }

  static filterUniqs(uniqs: string[] | und, target: Record<string, unknown>[], value: any) {
    if (uniqs == null || value == null) return value;

    const uniqVals = [value].flat().filter((val: any) => {
      return !uniqs.some(key => (key === '.' ? target.includes(val) : target.some(t => t?.[key] === val?.[key])));
    });

    if (uniqVals.length === 0) return undefined;
    if (smylib.isArr(value)) return uniqVals;
    return uniqVals[0];
  }

  static getAttribute(target: any, topField: (string | number) | (string | number)[]): any {
    let fields;

    if (smylib.isArr(topField)) fields = topField;
    else fields = [topField];

    const isVariated = smylib.isArr(topField);

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      if (smylib.isStr(field)) {
        const name = field.slice(1);

        if (field[0] === '.') {
          if (field === '.') {
            if (isVariated && target == null) continue;
            return target;
          } else if (name === 'length') {
            if (isVariated && !target.length) continue;
            return target.length;
          }
        } else if (field[0] === '!') {
          if (isVariated && target) continue;
          return !target;
        } else if (field[0] === '@') {
          const val = this.getGlob(name);

          if (isVariated && val == null) continue;
          return val;
        } else if (field[0] === '?') {
          const val = this.isExpected(target, target[name]);

          if (isVariated && !val) continue;
          return val;
        } else if (field[0] === '*') {
          const val = target[name] === undefined || this.isExpected(target, target[name]);

          if (isVariated && !val) continue;
          return val;
        } else {
          let val;
          if (field[0] === '\\' || field[0] === '$') {
            if (target[name] != null) val = target[name];
          } else if (target[field] != null) val = target[field];
          if (isVariated && val == null) continue;
          return val;
        }
      } else {
        const res = target[field];
        if (isVariated && res == null) continue;
        return res;
      }
    }
  }
}

const insertBeforeiFakeArr: [] = [];
const insertBeforeiItIt = (it: unknown) => it !== insertBeforeiFakeArr;
