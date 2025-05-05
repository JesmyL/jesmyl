import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'regexpert';
import { CoderResultComponent } from './model';
import { CoderResultValue } from './value';
import { CoderValueExpandable } from './value-expandable';

export const CoderResultObject: CoderResultComponent<object> = ({ value, name, scope, isObjectParent }) => {
  const keys = mylib.keys(value);
  const resultName = name ?? value.constructor.name;
  const scopeName = isObjectParent
    ? scope
    : scope + `{${resultName}${keys.length && `[${keys[0]}:${value[keys[0]]}]}`}`;

  return (
    <CoderValueExpandable
      name={resultName}
      scope={scopeName}
      shortValue={`${
        name && value.constructor.name !== 'Object' && value.constructor.name !== name
          ? value.constructor.name + ' '
          : ''
      }{ ${keys.slice(0, 3).join(', ')}${keys.length > 3 ? ', ...' : ''} }`}
      onCopy={keys.length ? () => JSON.stringify(value) : null}
      fullValue={
        keys.length === 0
          ? '...'
          : keys.map(key => {
              const keyBrackets = makeRegExp('/^\\w+$/').test(key) ? '' : '"';

              return (
                <div key={key}>
                  <CoderResultValue
                    name={`${keyBrackets}${key}${keyBrackets}`}
                    value={value[key]}
                    scope={scopeName + `[${key}]`}
                    isObjectParent
                  />
                </div>
              );
            })
      }
    />
  );
};
