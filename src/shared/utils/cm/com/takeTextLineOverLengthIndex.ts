import { makeRegExp } from 'regexpert';
import { clearTextLineForLengthCompute } from './clearTextLineForLengthCompute';

export const takeTextLineOverLengthIndex = (text: string, maxLength: number) => {
  const lines = text.split(makeRegExp(`/\n|\\[\\[/`));
  return {
    linei: lines.findIndex(line => clearTextLineForLengthCompute(line).length > maxLength),
    lines,
  };
};
