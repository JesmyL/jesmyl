import { makeRegExp } from 'regexpert';
import { slavicLowerLettersStr } from './const';

export const clearTextLineForLengthCompute = (line: string) =>
  line.replace(makeRegExp(`/[^${slavicLowerLettersStr} ]+/gi`), '');
