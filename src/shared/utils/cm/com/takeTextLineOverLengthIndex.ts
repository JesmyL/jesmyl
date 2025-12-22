import { makeRegExp } from 'regexpert';
import { clearTextLineForLengthCompute } from './clearTextLineForLengthCompute';

export const takeTextLineOverLengthIndex = (text: string, maxLength: number) => {
  const lines = text.split(makeRegExp(`/\n/`));
  return lines.findIndex(line => clearTextLineForLengthCompute(line).length > maxLength);
};
