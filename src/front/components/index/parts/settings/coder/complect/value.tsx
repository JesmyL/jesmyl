import { mylib } from '#shared/lib/my-lib';
import { CoderResultArray } from './array';
import { CoderResultFunction } from './function';
import { CoderResultComponent } from './model';
import { CoderResultObject } from './object';
import { CoderResultSimple } from './simple';

export const CoderResultValue: CoderResultComponent<unknown> = ({ value, name, scope, isObjectParent }) => {
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
      <CoderResultSimple
        value={value}
        name={name}
      />
    );

  if (mylib.isArr(value))
    return (
      <CoderResultArray
        value={value}
        name={name}
        scope={scope}
      />
    );

  if (mylib.isFunc(value))
    return (
      <CoderResultFunction
        value={value}
        name={name}
        scope={scope}
      />
    );

  if (mylib.isObj(value))
    return (
      <CoderResultObject
        value={value}
        name={name}
        scope={scope}
        isObjectParent={isObjectParent}
      />
    );

  return (
    <CoderResultSimple
      value={value}
      name={name}
    />
  );
};
