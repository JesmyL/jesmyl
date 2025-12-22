import { makeRegExp } from 'regexpert';
import { trimTextLines } from 'shared/utils/utils';
import { displayableTextBlockSingleWritedSymbolsStr, doubleQuotesStr, singleQuotesStr } from './const';

export const transformToClearText = (text: string) => {
  return trimTextLines(text)
    .replace(makeRegExp(`/[${doubleQuotesStr}]/g`), '"')
    .replace(makeRegExp(`/[${singleQuotesStr}]/g`), "'")
    .replace(makeRegExp(`/ ([,.!?:])/g`), '$1')
    .replace(makeRegExp(`/ -+ |-+ | -+/g`), '- ')
    .replace(makeRegExp(`/…|\\.{4,}/g`), '...')
    .replace(makeRegExp(`/([^.]|^)\\.{2}([^.]|$)/g`), '$1.$2')
    .replace(makeRegExp(`/([${displayableTextBlockSingleWritedSymbolsStr} ])\\1+/g`), '$1')
    .replace(makeRegExp(`/([,.;:!?)](?!["'.]))([^\\s])/g`), '$1 $2');
};
