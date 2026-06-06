import {
  checkIsArray,
  checkIsBoolean,
  checkIsFunction,
  checkIsJsDate,
  checkIsNaN,
  checkIsNotUndefined,
  checkIsNull,
  checkIsNumber,
  checkIsObject,
  checkIsString,
  checkIsUndefined,
} from './checkIs';
import { objectEntries, objectLength } from './object.utils';

export const checkIsEq = (base: unknown, source: unknown, isIgnoreArrayItemsOrder?: boolean) => {
  if (base === source) return true;
  if (base == null && base == source) return true;
  if (base == null || source == null) return false;

  if (typeOf(base) !== typeOf(source)) return false;

  if (typeof base === 'object') {
    if (checkIsArray(base) && checkIsArray(source)) {
      if (objectLength(base) !== objectLength(source)) return false;

      if (isIgnoreArrayItemsOrder) {
        for (const bVal of base) {
          let isNotFound = true;

          for (const sVal of source)
            if (checkIsEq(bVal, sVal, isIgnoreArrayItemsOrder)) {
              isNotFound = false;
              break;
            }

          if (isNotFound) return false;
        }

        return true;
      } else {
        for (let basei = 0; basei < objectLength(base); basei++) {
          if (!checkIsEq(base[basei], source[basei], isIgnoreArrayItemsOrder)) return false;
        }

        return true;
      }
    }

    const bEntries = objectEntries(base).filter(([, val]) => checkIsNotUndefined(val));
    const sEntries = objectEntries(source).filter(([, val]) => checkIsNotUndefined(val));

    if (
      objectLength(bEntries) !== objectLength(sEntries) ||
      bEntries.some(([bKey, bVal]) => !checkIsEq(bVal, source[bKey as never], isIgnoreArrayItemsOrder))
    )
      return false;
  } else if (base !== source) return false;

  return true;
};

const typeOf = (obj: unknown) => {
  return [
    checkIsString,
    checkIsNumber,
    checkIsBoolean,
    checkIsArray,
    checkIsNull,
    checkIsUndefined,
    checkIsFunction,
    checkIsObject,
    checkIsNaN,
    checkIsJsDate,
  ].findIndex(type => type(obj));
};
