import { AppName } from '#basis/model/App.model';

export type LocaleSatisfies<T extends PRecord<AppName, object>> = T;

export type LocaleStrRecord<T extends string | number> = Record<`${T}`, LocaleSimpleString>;

export type LocaleStrWithInterpolation<Name extends string> = `${string}$${Name}${';' | ' ' | '{' | '}'}${string}`;

export type LocaleSimpleString = `${Uppercase<string> | Lowercase<string>}${string}`;

export type LocaleStrWithTwoInterpolations<Name1 extends string, Name2 extends string> =
  | `${LocaleStrWithInterpolation<Name1>}${LocaleStrWithInterpolation<Name2>}`
  | `${LocaleStrWithInterpolation<Name2>}${LocaleStrWithInterpolation<Name1>}`;

export type LocaleAnyType =
  | LocaleStrWithTwoInterpolations<string, string>
  | LocaleStrWithInterpolation<string>
  | LocaleSimpleString
  | LocaleSimpleString[];
