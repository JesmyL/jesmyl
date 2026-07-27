import { AppName } from '#basis/model/App.model';
import { StringTemplaterInterpolation, StringTemplaterWithTwoInterpolations } from 'shared/utils/stringTemplater/model';

export type LocaleSatisfies<T extends PRecord<AppName, object> & { v: number }> = T;

export type LocaleStrRecord<T extends string | number> = Record<`${T}`, LocaleSimpleString>;

export type LocaleSimpleString = `${Uppercase<string> | Lowercase<string>}${string}`;

export type LocaleAnyType =
  | StringTemplaterWithTwoInterpolations<string, string>
  | StringTemplaterInterpolation<string>
  | LocaleSimpleString
  | LocaleSimpleString[];
