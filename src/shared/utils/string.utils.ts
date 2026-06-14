import { makeRegExp } from 'regexpert';
import { slavicLowerLettersStr } from './cm/com/const';

export const textToUpperCase = <Str extends string>(text: Str | nil) => (text?.toUpperCase() ?? '') as Uppercase<Str>;
export const textToLowerCase = <Str extends string>(text: Str | nil) => (text?.toLowerCase() ?? '') as Lowercase<Str>;
export const textToCapitalizeCase = <Str extends string>(text: Str) =>
  (textToUpperCase(text[0]) + text.slice(1)) as Capitalize<Str>;

export const textToCapitalizeSlavicCase = (text: string) => {
  const wordi = text.search(makeRegExp(`/[${slavicLowerLettersStr}]/i`));
  return wordi < 0 ? text : text.slice(0, wordi) + (textToUpperCase(text.at(wordi)) ?? '') + text.slice(wordi + 1);
};
