import { makeRegExp } from 'regexpert';
import { textToUpperCase } from 'shared/utils/string.utils';
import { anyQuotesStr, displayableTextBlockCharsStr, nbsp, openAndClosedQuotes, slavicLowerLettersStr } from './const';

let level = 0;
const dashReplacer: (...args: string[]) => string = (_, $1, $2, $3) =>
  $2 ? `${nbsp}—\n` : $1 || ($3?.[0] === '\n' ? `\n—${nbsp}` : `${nbsp}— `);

const replaceNestedBrackets = (all: string, index: number, text: string) => {
  const pre = text[index - 1];
  const isOpen = !pre || pre.match(makeRegExp(`/\\s/`));

  const brLevel = level - (isOpen ? 0 : 1);
  level -= (isOpen ? -1 : 1) * all.length;

  return all
    .split('')
    .map((_, bri) => openAndClosedQuotes[brLevel - (isOpen ? -bri : bri)]?.[isOpen ? 0 : 1] ?? '`')
    .join('');
};

export const transformToDisplayedText = (text = '', isSetFirstLetterUpperCase = true) => {
  level = 0;

  text = text
    .replace(makeRegExp(`/[^${displayableTextBlockCharsStr}[\\]]+/gi`), '')
    .replace(makeRegExp(`/"+/g`), replaceNestedBrackets)
    .replace(makeRegExp(`/((?=\\S)-+(?=\\S))|( ?-+\n)|(\\s?-+ ?)/g`), dashReplacer)
    .replace(makeRegExp(`/\\( [${anyQuotesStr}]\\)|\\([${anyQuotesStr}] \\)/g`), '');

  if (isSetFirstLetterUpperCase)
    text = text.replace(
      makeRegExp(`/(?:(?:^|\\n)[^${slavicLowerLettersStr}]*)[${slavicLowerLettersStr}]/gi`),
      textToUpperCase,
    );

  return { text, level };
};
