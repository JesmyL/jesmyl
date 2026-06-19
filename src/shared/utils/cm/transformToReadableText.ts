import { makeRegExp } from 'regexpert';
import { CmComTextSquareBracketsMode } from 'shared/api';
import { defaultTextCase } from 'shared/const/textCase';
import { TextCase } from 'shared/model/common';
import { textToCapitalizeSlavicCase, textToUpperCase } from '../string.utils';
import { itIt } from '../utils';
import {
  anyQuotesStr,
  comNbsp,
  displayableTextBlockCharsStr,
  openAndClosedQuotes,
  slavicLowerLettersStr,
} from './com/const';
import { squareBracketsReplacers } from './com/takeTextBlockIncorrects';

export const cmTransformToReadableText = (
  text: string | nil,
  textCase: TextCase | nil,
  squareBracketsMode: CmComTextSquareBracketsMode,
) => {
  level = 0;

  if (text) {
    if (squareBracketsMode) text = squareBracketsReplacers[squareBracketsMode](text);
    if (textCase !== TextCase.Capitalize) text = textToCapitalizeSlavicCase(text);

    text = mappers[textCase ?? defaultTextCase](text, true);
    text = replaceInText(text);
    if (textCase !== TextCase.Uppercase) text = upperCasesText(text);
  } else text = '';

  return { level, text };
};

export const cmTransformToReadableLines = (
  lines: string[] | nil,
  textCase: TextCase | nil,
  squareBracketsMode: CmComTextSquareBracketsMode,
) => {
  level = 0;

  if (!lines?.length) return { lines: [], level };

  textCase ??= defaultTextCase;
  let lastSymbol = '';

  lines = lines.filter(itIt).map((line, linei) => {
    line = squareBracketsReplacers[squareBracketsMode](line);

    if (textCase !== TextCase.Capitalize && (!linei || prepsSet.has(lastSymbol)))
      line = textToCapitalizeSlavicCase(line);

    line = replaceInText(mappers[textCase](line, true)).trim();
    if (textCase !== TextCase.Uppercase) line = upperCasesText(line);

    lastSymbol = line.slice(-1);
    return line;
  });

  return { level, lines };
};

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

let level = 0;
const dashReplacer: (...args: string[]) => string = (_, $1, $3, $4) =>
  $3 ? `${comNbsp}—\n` : !$4 || $1?.[0] === '\n' || $1 === '-' ? `\n—${comNbsp}` : `${comNbsp}— `;

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

const replaceInText = (text: string) =>
  text
    .replace(makeRegExp(`/[^${displayableTextBlockCharsStr}[\\]]+/gi`), '')
    .replace(makeRegExp(`/"+/g`), replaceNestedBrackets)
    .replace(makeRegExp(`/((?:^|\\n)-+ ?)|( ?-+\n)|((?=\\S)-+\\s)/gm`), dashReplacer)
    .replace(makeRegExp(`/\\( [${anyQuotesStr}]\\)|\\([${anyQuotesStr}] \\)/g`), '');

const upperCasesText = (text: string) =>
  text.replace(makeRegExp(`/(?:[${preps}]\\s|[${anyQuotesStr}])[${slavicLowerLettersStr}]/g`), textToUpperCase);

const preps = '.!?';
const prepsSet = new Set(preps);

const mappers: Record<TextCase, (line: string, isMultiline?: boolean) => string> = {
  [TextCase.Capitalize]: textToCapitalizeSlavicCase,
  [TextCase.Uppercase]: textToUpperCase,
  [TextCase.AsIs]: itIt,
};
