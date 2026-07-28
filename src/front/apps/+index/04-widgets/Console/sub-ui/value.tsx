import {
  checkIsArray,
  checkIsBoolean,
  checkIsFunction,
  checkIsNumber,
  checkIsObject,
  checkIsRegExp,
  checkIsString,
} from 'shared/utils/checkIs';
import { IndexConsoleCoderResultComponent } from '../model/model';
import { IndexConsoleCoderResultArray } from './array';
import { IndexConsoleCoderResultFunction } from './function';
import { IndexConsoleCoderResultObject } from './object';
import { IndexConsoleCoderResultSimple } from './simple';

export const IndexConsoleCoderResultValue: IndexConsoleCoderResultComponent<unknown> = ({
  value,
  name,
  scope,
  isObjectParent,
}) => {
  if (
    value === null ||
    value === undefined ||
    checkIsNumber(value) ||
    checkIsString(value) ||
    checkIsBoolean(value) ||
    checkIsRegExp(value) ||
    value instanceof Error
  )
    return (
      <IndexConsoleCoderResultSimple
        value={value}
        name={name}
      />
    );

  if (checkIsArray(value))
    return (
      <IndexConsoleCoderResultArray
        value={value}
        name={name}
        scope={scope}
      />
    );

  if (checkIsFunction(value))
    return (
      <IndexConsoleCoderResultFunction
        value={value}
        name={name}
        scope={scope}
      />
    );

  if (checkIsObject(value))
    return (
      <IndexConsoleCoderResultObject
        value={value}
        name={name}
        scope={scope}
        isObjectParent={isObjectParent}
      />
    );

  return (
    <IndexConsoleCoderResultSimple
      value={value}
      name={name}
    />
  );
};
