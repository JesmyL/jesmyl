import { checkIsArray, checkIsObject } from './checkIs';
import { objectEntries } from './object.utils';

const takeValuePathMaker =
  (findKey: 'find' | 'findLast') =>
  (obj: unknown, value: unknown, checkBranch: (key: string | number, obj: unknown) => boolean = () => true) => {
    type Ret = (string | number)[];
    let foundValue;
    let foundRet: Ret = [];
    const set = new Set<unknown>();

    try {
      const concatRet = (ret: Ret, keyPathValue: string | number): Ret => (foundRet = ret.concat(keyPathValue));

      const find = (obj: unknown, ret: Ret): void => {
        if (set.has(obj)) return;
        set.add(obj);

        if (obj === value) {
          foundValue = value;
          throw '';
        } else if (checkIsArray(obj)) obj[findKey]((o, oi) => checkBranch(oi, o) && find(o, concatRet(ret, oi)));
        else if (checkIsObject(obj))
          objectEntries(obj)[findKey](([key, value]) => checkBranch(key, value) && find(value, concatRet(ret, key)));
      };

      find(obj, foundRet);

      return foundRet;
    } catch (error) {
      if (foundValue === value) return foundRet;
      else throw error;
    }
  };

export const takeValuePath = {
  first: takeValuePathMaker('find'),
  last: takeValuePathMaker('findLast'),
};
