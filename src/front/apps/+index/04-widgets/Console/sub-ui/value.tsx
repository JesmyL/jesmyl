import { mylib } from '#shared/lib/my-lib';
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
    mylib.isNum(value) ||
    mylib.isStr(value) ||
    mylib.isBool(value) ||
    mylib.isRegExp(value) ||
    value instanceof Error
  )
    return (
      <IndexConsoleCoderResultSimple
        value={value}
        name={name}
      />
    );

  if (mylib.isArr(value))
    return (
      <IndexConsoleCoderResultArray
        value={value}
        name={name}
        scope={scope}
      />
    );

  if (mylib.isFunc(value))
    return (
      <IndexConsoleCoderResultFunction
        value={value}
        name={name}
        scope={scope}
      />
    );

  if (mylib.isObj(value))
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
