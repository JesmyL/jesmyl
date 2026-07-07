import { checkIsArray, checkIsNotNull, checkIsObject } from './checkIs';

export const deepClone =
  typeof structuredClone === 'function'
    ? <Val>(obj: Val, options?: Parameters<typeof structuredClone>[1]): Val => structuredClone(obj, options)
    : <Val>(what: Val): Val => {
        const obj = checkIsArray(what) ? [] : checkIsObject(what) ? {} : null;

        if (checkIsNotNull(obj)) {
          for (const key in what) obj[key as never] = deepClone(what[key]) as never;
          return obj as Val;
        }

        return what;
      };
