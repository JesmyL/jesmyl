import { makeRegExp } from 'regexpert';
import { capitalizeText, trimTextLines } from 'shared/utils/utils';
import { displayableTextBlockSingleWritedSymbolsStr, doubleQuotesStr, singleQuotesStr } from './const';

export const transformToClearText = (text: string) => {
  return trimTextLines(
    text
      .replace(makeRegExp(`/[${doubleQuotesStr}]/g`), '"')
      .replace(makeRegExp(`/[${singleQuotesStr}]/g`), "'")
      .replace(makeRegExp(`/ ([,.!?:])/g`), '$1')
      .replace(makeRegExp(`/ +-+([ \\n])+|-+([ \\n])+| -+/g`), dashesReplacer)
      .replace(makeRegExp(`/ *[|]+ */g`), all => (all.trim().length < 2 ? ' |' : '|| '))
      .replace(makeRegExp(`/…|\\.{4,}/g`), '...')
      .replace(makeRegExp(`/([^.]|^)\\.{2}([^.]|$)/g`), '$1.$2')
      .replace(makeRegExp(`/([${displayableTextBlockSingleWritedSymbolsStr} ])\\1+/g`), '$1')
      .replace(makeRegExp('/кров[иь]/g'), capitalizeText),
  );
};

const dashesReplacer = (_all: string, $1: string | und, $2: string | und) => `-${$1 || $2 || ' '}`;
