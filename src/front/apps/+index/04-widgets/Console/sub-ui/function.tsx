import { makeRegExp } from 'regexpert';
import { IndexConsoleCoderResultComponent } from '../model/model';
import { IndexConsoleCoderValueExpandable } from './value-expandable';

const functionReplacerResult = (_all: string, _$1: string, $2: string) => ($2 ? $2 + ' => { ... }' : '');

export const IndexConsoleCoderResultFunction: IndexConsoleCoderResultComponent<Function> = ({ value, name, scope }) => {
  const fullValue = '' + value;
  const shortValue =
    value.name !== name ? value.name + '()' : fullValue.replace(makeRegExp('/((.+?)=>)?.*/'), functionReplacerResult);

  return (
    <IndexConsoleCoderValueExpandable
      name={name}
      scope={scope}
      shortValue={shortValue}
      fullValue={fullValue}
      onCopy={() => fullValue}
    />
  );
};
