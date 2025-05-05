import { makeRegExp } from 'regexpert';
import { CoderResultComponent } from './model';
import { CoderValueExpandable } from './value-expandable';

const functionReplacerResult = (_all: string, _$1: string, $2: string) => ($2 ? $2 + ' => { ... }' : '');

export const CoderResultFunction: CoderResultComponent<Function> = ({ value, name, scope }) => {
  const fullValue = '' + value;
  const shortValue =
    value.name !== name ? value.name + '()' : fullValue.replace(makeRegExp('/((.+?)=>)?.*/'), functionReplacerResult);

  return (
    <CoderValueExpandable
      name={name}
      scope={scope}
      shortValue={shortValue}
      fullValue={fullValue}
      onCopy={() => fullValue}
    />
  );
};
