import { checkIsArray, checkIsObject } from './checkIs';
import { objectLength } from './object.utils';

export const removeEmptyRightValues = (
  value: unknown,
  checkIsEmpty?: ((value: unknown, objSize: number | 'NO') => boolean) | nil,
  mapEachValue?: ((value: unknown) => unknown) | nil,
): boolean => {
  checkIsEmpty ??= (it, size) => (!it && it !== false) || !size;

  const remove = (value: unknown) => {
    if (value instanceof Map) {
      for (const key of value.keys()) {
        if (mapEachValue) value.set(key, mapEachValue(value.get(key)));

        if (remove(value.get(key))) {
          value.delete(key);
        }
      }

      return checkIsEmpty(value, value.size);
    }

    let isSet;

    if ((isSet = value instanceof Set) || checkIsArray(value)) {
      let isFullNotFound = true;
      const arrValue = checkIsArray(value) ? value : Array.from(value);

      for (let i = arrValue.length - 1; i >= 0; i--) {
        if (mapEachValue) {
          arrValue[i] = mapEachValue(arrValue[i]);

          if (isFullNotFound)
            if (remove(arrValue[i])) arrValue.pop();
            else isFullNotFound = false;
        } else {
          if (remove(arrValue[i])) arrValue.pop();
          else break;
        }
      }

      if (isSet) {
        const resultSet = value as Set<unknown>;
        resultSet.clear();

        arrValue.forEach(it => resultSet.add(it));

        return checkIsEmpty(resultSet, resultSet.size);
      }

      return checkIsEmpty(arrValue, objectLength(arrValue));
    }

    if (checkIsObject(value)) {
      for (const key in value) {
        if (mapEachValue) value[key] = mapEachValue(value[key]);

        if (remove(value[key])) {
          delete value[key];
        }
      }

      return checkIsEmpty(value, objectLength(value));
    }

    return checkIsEmpty(value, 'NO');
  };

  return remove(value);
};
