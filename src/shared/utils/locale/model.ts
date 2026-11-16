import { LocaleSimpleString } from 'shared/model/+locale/model';
import { StringTemplaterGenKey, StringTemplaterVals } from '../stringTemplater/model';

export type SimpleDictValue = string | number | boolean | (() => unknown);

export type NEXTcb<Key extends string, Ret = unknown> = (key: Key, value: string, index: number) => Ret;

export type TranslateKeyResult<Dict, Key extends keyof Dict> = Dict[Key] extends string | unknown[]
  ? Dict[Key] | ''
  : '';

export type TemplateInterpolationVals<Val> = [StringTemplaterVals<Val>] extends [never]
  ? Record<string, SimpleDictValue>
  : StringTemplaterVals<Val> extends object
    ? StringTemplaterVals<Val>
    : Record<string, SimpleDictValue>;

export type TemplateInterpolationKeys<Val> = keyof TemplateInterpolationVals<Val> & string;

export type TemplateInterpolationGenKey<Val> = StringTemplaterGenKey<Val>;

// Ключи словаря без метаданных подстановки: у остальных значений второй аргумент обязателен, поэтому в этот союз они не попадают.
export type NoInterpolationKeys<Dict> = {
  [Key in keyof Dict]: [StringTemplaterVals<Dict[Key]>] extends [never] ? Key : never;
}[keyof Dict];

// Форма второго аргумента: для значений с подстановкой кортеж `[never]` делает вызов без него невозможным, для остальных аргумент необязателен.
export type TranslationArgs<Val> = [StringTemplaterVals<Val>] extends [never] ? [interpolation?: nil | void] : [never];

export interface DefinedTranslateFunction<Dict extends object> {
  <
    const Val extends string,
    const Vals extends object = TemplateInterpolationVals<Val>,
    const GenKey extends string = TemplateInterpolationGenKey<Val>,
    Interpolation extends Vals & { NEXT?: NEXTcb<GenKey> } = Vals & { NEXT?: NEXTcb<GenKey> },
  >(
    selector: (translates: Dict) => Val,
    interpolation: Interpolation,
  ): (Interpolation extends { NEXT: NEXTcb<string, infer R> } ? R[] : string) | '';

  // Селекторный вызов без подстановки: селектор, возвращающий значение с метаданными подстановки, сюда не подходит.
  <const Val extends LocaleSimpleString>(selector: (translates: Dict) => Val, ...args: TranslationArgs<Val>): Val | '';

  <
    Key extends keyof Dict,
    const Vals extends object = TemplateInterpolationVals<Dict[Key]>,
    const GenKey extends string = TemplateInterpolationGenKey<Dict[Key]>,
    Interpolation extends Vals & { NEXT?: NEXTcb<GenKey> } = Vals & { NEXT?: NEXTcb<GenKey> },
  >(
    key: Key,
    interpolation: Interpolation,
  ): (Interpolation extends { NEXT: NEXTcb<string, infer R> } ? R[] : string) | '';

  // Вызов по ключу без подстановки допустим только для ключей, чьи значения не требуют подстановки.
  <Key extends NoInterpolationKeys<Dict>>(key: Key, interpolation?: nil | void): TranslateKeyResult<Dict, Key>;
}
