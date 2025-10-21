import { IndexConsoleCoderResultComponent } from '../model/model';
import { IndexConsoleCoderResultValue } from './value';
import { IndexConsoleCoderValueExpandable } from './value-expandable';

export const IndexConsoleCoderResultArray: IndexConsoleCoderResultComponent<unknown[]> = ({ value, name, scope }) => {
  return (
    <IndexConsoleCoderValueExpandable
      name={name || 'Array'}
      scope={(scope || '[]') + (value.length ? value[0] + ':' + value.length : '')}
      shortValue={`[ ${value.length} ]`}
      fullValue={value.map((value, valuei) => {
        return (
          <div key={valuei}>
            <IndexConsoleCoderResultValue
              name={valuei}
              value={value}
              scope={scope + `[${valuei}]`}
              isObjectParent
            />
          </div>
        );
      })}
      onCopy={value.length ? () => JSON.stringify(value) : null}
    />
  );
};
