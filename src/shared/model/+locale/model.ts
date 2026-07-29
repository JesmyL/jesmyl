import { AppName } from '#basis/model/App.model';
import { StringTemplaterInterpolation } from 'shared/utils/stringTemplater/model';

export type LocaleSatisfies<T extends PRecord<AppName, object> & { v: number }> = T;

export type LocaleStrRecord<T extends string | number> = Record<`${T}`, LocaleSimpleString>;

export type LocaleStrOrInterpolationRecord<All extends string | number, T extends All, Name extends string> = Record<
  `${Exclude<All, T>}`,
  LocaleSimpleString
> &
  Record<`${T}`, StringTemplaterInterpolation<Name>>;

export type LocaleSimpleString = `${Uppercase<string> | Lowercase<string>}${string}`;
