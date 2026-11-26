import { makeRegExp } from 'regexpert';
import { CmComTextSquareBracketsMode, EeStorePack } from 'shared/api';
import { IIncorrects } from 'shared/model/cm/Incorrects';
import { eeTextIncorrects } from './eeTextIncorrects';
import {
  makeTextBlockForIncorrects,
  takeTextBlockLocalIncorrects,
  translateIncorrects,
} from './takeTextBlockLocalIncorrects';

const bracketReplacerReg = makeRegExp('/(?:\\s|_)(\\[)?\\[([^\\]]*)]+/g');
export const squareBracketsReplacers: Record<CmComTextSquareBracketsMode, <Text extends string>(text: Text) => Text> = {
  [CmComTextSquareBracketsMode.AsIs]: text => text,

  [CmComTextSquareBracketsMode.BrBrackets]: text =>
    text.replace(bracketReplacerReg, (_all, $1, $2) => ` ${$1 ? '</br>' : ''}(${$2})`) as never,

  [CmComTextSquareBracketsMode.NlBrackets]: text =>
    text.replace(bracketReplacerReg, (_all, $1, $2) => ` ${$1 ? '\n' : ''}(${$2})`) as never,

  [CmComTextSquareBracketsMode.Remove]: text => text.replace(bracketReplacerReg, '') as never,
};

export const takeTextBlockIncorrects = (
  text: string | und = '',
  eeStore: EeStorePack,
  extraAvailSymbols = '',
  translate: typeof translateIncorrects = translateIncorrects,
): IIncorrects => {
  const localIncorrects = takeTextBlockLocalIncorrects(text, extraAvailSymbols, translate);
  if (localIncorrects) return localIncorrects;

  return eeTextIncorrects(makeTextBlockForIncorrects(text), eeStore);
};
