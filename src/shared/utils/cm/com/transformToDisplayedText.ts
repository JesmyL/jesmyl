import { makeRegExp } from 'regexpert';
import { anyQuotesStr, displayableTextBlockCharsStr, nbsp, openAndClosedQuotes, slavicLowerLettersStr } from './const';

let level = 0;
const dashReplacer: (...args: string[]) => string = (_, $1, $2) => ($2 ? ' —\n' : $1 || `${nbsp}— `);

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

export const transformToDisplayedText = (
  text = '',
  isSetFirstLetterUpperCase = true,
  isHideNewLineSeparator = true,
) => {
  level = 0;

  const str = text
    .replace(makeRegExp(`/[^${displayableTextBlockCharsStr}${isHideNewLineSeparator ? '' : '|'}]+/gi`), '')
    .replace(makeRegExp(`/"+/g`), replaceNestedBrackets)
    .replace(makeRegExp(`/((?=\\S)-+(?=\\S))|( ?-+\n)|( ?-+ ?)/g`), dashReplacer)
    .replace(makeRegExp(`/\\( [${anyQuotesStr}]\\)|\\([${anyQuotesStr}] \\)/g`), '');

  return {
    text: isSetFirstLetterUpperCase
      ? str.replace(makeRegExp(`/(?:^|\\n)[${slavicLowerLettersStr}]/g`), all => all.toUpperCase())
      : str,
    level,
  };
};
