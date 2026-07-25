import { makeRegExp } from 'regexpert';
import {
  LocaleSimpleString,
  LocaleStrWithInterpolation,
  LocaleStrWithTwoInterpolations,
} from 'shared/model/+locale/model';
import { checkIsArray, checkIsFunction, checkIsString } from '../checkIs';
import { stringTemplater } from '../stringTemplater';

interface DefinedTranslateFunction<Dict> {
  <
    const Val extends LocaleStrWithTwoInterpolations<string, string> | LocaleStrWithInterpolation<string>,
    const Interpolation extends Val extends LocaleStrWithTwoInterpolations<infer V1, infer V2>
      ? Record<V1 | V2, string | number>
      : Val extends LocaleStrWithInterpolation<infer V>
        ? Record<V, string | number>
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
      if (interpolation) {
        const value = selector(checkIsFunction(dictScalar) ? dictScalar() : dictScalar);

        return checkIsString(value) ? stringTemplater(value, interpolation) : checkIsArray(value) ? value || '' : '';
      }

      return selector(checkIsFunction(dictScalar) ? dictScalar() : dictScalar);
    } catch {
      return `${selector}`.replace(makeRegExp('/^[^.[]+\\.?/'), '');
    }
  };
};
