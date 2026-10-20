import { StringTemplaterInterpolation } from 'shared/utils/stringTemplater/model';

export type LocaleStrRecord<T extends string | number, Value extends string = LocaleSimpleString> = Record<
  `${T}`,
  Value
>;

export type LocaleNumStrRecord<T extends string | number, Value extends string | object = LocaleSimpleString> = Record<
  `${T}`,
  Value
> &
  Value[];

export type LocaleStrOrInterpolationRecord<All extends string | number, T extends All, Name extends string> = Record<
  `${Exclude<All, T>}`,
  LocaleSimpleString
> &
  Record<`${T}`, StringTemplaterInterpolation<Name>>;

export type LocaleSimpleString = `${Uppercase<string> | Lowercase<string>}${string}`;
