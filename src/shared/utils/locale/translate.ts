import { makeRegExp } from 'regexpert';
import { checkIsArray, checkIsFunction, checkIsString } from '../checkIs';
import { stringTemplater } from '../stringTemplater';
import { DefinedTranslateFunction } from './model';

export const translateBaseDefine = <Dict extends object>(
  dictScalar: (() => Dict) | Dict,
): DefinedTranslateFunction<Dict> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translate = (translator: ((translates: Dict) => unknown) | number, interpolation?: unknown): any => {
    try {
      const dict = checkIsFunction(dictScalar) ? dictScalar() : dictScalar;
      const value = checkIsFunction(translator) ? translator(dict) : dict[translator as keyof Dict];

      return checkIsString(value)
        ? interpolation
          ? stringTemplater(value, interpolation)
          : value
        : checkIsArray(value)
          ? value
          : '';
    } catch {
      return checkIsFunction(translator) ? `${translator}`.replace(makeRegExp('/^[^.[]+\\.?/'), '') : '';
    }
  };

  return translate;
};
