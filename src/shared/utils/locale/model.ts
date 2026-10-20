import { LocaleSimpleString } from 'shared/model/+locale/model';
import { StringTemplaterInterpolation, StringTemplaterWithTwoInterpolations } from '../stringTemplater/model';

export type SimpleDictValue = string | number | boolean | (() => unknown);

export type NEXTcb<Key extends string, Ret = unknown> = (key: Key, value: string, index: number) => Ret;

export type TranslateKeyResult<Dict, Key extends keyof Dict> = Dict[Key] extends string | unknown[]
  ? Dict[Key] | ''
  : '';

export type TemplateInterpolationKeys<Val> = [Val] extends [
  StringTemplaterWithTwoInterpolations<infer V1, infer V2, string>,
]
  ? V1 | V2
  : [Val] extends [StringTemplaterInterpolation<infer V, string>]
    ? V
    : string;

export interface DefinedTranslateFunction<Dict extends object> {
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

  <
    Key extends keyof Dict,
    Interpolation extends Record<TemplateInterpolationKeys<Dict[Key]>, SimpleDictValue> & {
      NEXT?: NEXTcb<string>;
    },
  >(
    key: Key,
    interpolation: Interpolation,
  ): (Interpolation extends { NEXT: NEXTcb<string, infer R> } ? R[] : string) | '';

  <Key extends keyof Dict>(key: Key, interpolation?: nil | void): TranslateKeyResult<Dict, Key>;
}
