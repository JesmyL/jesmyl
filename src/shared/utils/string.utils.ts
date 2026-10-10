import { makeRegExp } from 'regexpert';
import { slavicLowerLettersStr } from './cm/com/const';
import { lazyInit } from './lazyInit';
import { objectKeys } from './object.utils';

export const textToUpperCase = <Str extends string>(text: Str | nil) => (text?.toUpperCase() ?? '') as Uppercase<Str>;
export const textToLowerCase = <Str extends string>(text: Str | nil) => (text?.toLowerCase() ?? '') as Lowercase<Str>;
export const textToCapitalizeCase = <Str extends string>(text: Str) =>
  (textToUpperCase(text[0]) + text.slice(1)) as Capitalize<Str>;

const capRep = (_: string, $1: string, $2: string) => `${$1}${textToUpperCase($2)}`;

export const textToCapitalizeSlavicCase = (text: string, isMultiline = false) =>
  text.replace(
    makeRegExp(`/^([^${slavicLowerLettersStr}]*)([${slavicLowerLettersStr}])/${isMultiline ? 'gim' : 'i'}`),
    capRep,
  );

export const escapeHtmlLazy = lazyInit(() => {
  const htmlReplaces: Record<string, string> = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
  };

  const replacer = (all: string) => htmlReplaces[all] || all;
  const regexp = makeRegExp(`/[${objectKeys(htmlReplaces).join('')}]/g`);

  return (text: string) => text.replace(regexp, replacer);
});
