import { makeRegExp } from 'regexpert';
import { LocaleSimpleString } from 'shared/model/+locale/model';
import { checkIsArray, checkIsFunction, checkIsString } from '../checkIs';
import { stringTemplater } from '../stringTemplater';
import { StringTemplaterInterpolation, StringTemplaterWithTwoInterpolations } from '../stringTemplater/model';

type SimpleDictValue = string | number | boolean;

interface DefinedTranslateFunction<Dict> {
  <
    const Val extends StringTemplaterWithTwoInterpolations<string, string> | StringTemplaterInterpolation<string>,
    const Interpolation extends Val extends StringTemplaterWithTwoInterpolations<infer V1, infer V2>
      ? Record<V1 | V2, SimpleDictValue>
      : Val extends StringTemplaterInterpolation<infer V>
        ? Record<V, SimpleDictValue>
        : never,
  >(
    selector: (translates: Dict) => Val,
    interpolation: Interpolation,
  ): Val | '';

  <const Val extends LocaleSimpleString | LocaleSimpleString[]>(
    selector: (translates: Dict) => Val,
    interpolation?: nil | void,
  ): Val | '';
}

export const translateBaseDefine = <Dict extends object>(
  dictScalar: (() => Dict) | Dict,
): DefinedTranslateFunction<Dict> => {
  return (selector: (translates: Dict) => unknown, interpolation?: unknown) => {
    try {
      const value = selector(checkIsFunction(dictScalar) ? dictScalar() : dictScalar);

      return checkIsString(value)
        ? interpolation
          ? stringTemplater(value, interpolation)
          : value
        : checkIsArray(value)
          ? value
          : '';
    } catch {
      return `${selector}`.replace(makeRegExp('/^[^.[]+\\.?/'), '');
    }
  };
};
