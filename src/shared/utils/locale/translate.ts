import { makeRegExp } from 'regexpert';
import { LocaleSimpleString } from 'shared/model/+locale/model';
import { checkIsArray, checkIsFunction, checkIsString } from '../checkIs';
import { stringTemplater } from '../stringTemplater';
import { StringTemplaterInterpolation, StringTemplaterWithTwoInterpolations } from '../stringTemplater/model';

type SimpleDictValue = string | number | boolean | (() => unknown);

type NEXTcb<Key extends string, Ret = unknown> = (key: Key, value: string, index: number) => Ret;

interface DefinedTranslateFunction<Dict> {
  <
    const Val extends
      | StringTemplaterWithTwoInterpolations<string, string, string>
      | StringTemplaterInterpolation<string, string>,
    //
    const VKey extends Val extends StringTemplaterWithTwoInterpolations<infer V1, infer V2, string>
      ? V1 | V2
      : Val extends StringTemplaterInterpolation<infer V, string>
        ? V
        : string,
    //
    const GenKey extends Val extends StringTemplaterWithTwoInterpolations<string, string, infer K>
      ? K
      : Val extends StringTemplaterInterpolation<string, infer K>
        ? K
        : string,
    //
    Interpolation extends Record<VKey, SimpleDictValue> & { NEXT?: NEXTcb<GenKey> },
    //
    Ret extends Interpolation extends { NEXT: NEXTcb<GenKey, infer R> } ? R[] : string,
  >(
    selector: (translates: Dict) => Val,
    interpolation: Interpolation,
  ): Ret | '';

  <const Val extends LocaleSimpleString>(selector: (translates: Dict) => Val, interpolation?: nil | void): Val | '';
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
