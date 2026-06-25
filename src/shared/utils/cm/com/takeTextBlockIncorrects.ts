import { makeRegExp } from 'regexpert';
import { CmComTextSquareBracketsMode, EeStorePack } from 'shared/api';
import { IIncorrects } from 'shared/model/cm/Incorrects';
import { TextCase } from 'shared/model/common';
import { smylib } from 'shared/utils/SMyLib';
import { cmTransformToReadableText } from '../transformToReadableText';
import {
  displayableTextBlockCharsStr,
  displayableTextBlockSymbolsStr,
  doubleQuotesStr,
  replacableAvailableCharsStr,
  singleQuotesStr,
  slavicLowerLettersStr,
} from './const';
import { eeTextIncorrects } from './eeTextIncorrects';

const availSymbols = `${doubleQuotesStr}${singleQuotesStr}${replacableAvailableCharsStr}` as const;
const squareReplaceReg = makeRegExp(
  `/([${displayableTextBlockSymbolsStr}${slavicLowerLettersStr}${availSymbols}]) \\[\\[?|](?=\\n|$)/gi`,
);
const notAvailSymbolsReg = `/[^${displayableTextBlockCharsStr}${availSymbols}]+/gi` as const;

export const takeTextBlockCorrectBrackets = (text: string) =>
  text.replace(squareReplaceReg, (all, $1) => (all.endsWith(']') ? ')' : $1 + ' ('));

const bracketReplacerReg = makeRegExp('/(?:\\s|_)(\\[)?\\[([^\\]]*)]+/g');
export const squareBracketsReplacers: Record<CmComTextSquareBracketsMode, <Text extends string>(text: Text) => Text> = {
  [CmComTextSquareBracketsMode.AsIs]: text => text,

  [CmComTextSquareBracketsMode.BrBrackets]: text =>
    text.replace(bracketReplacerReg, (_all, $1, $2) => ` ${$1 ? '</br>' : ''}(${$2})`) as never,

  [CmComTextSquareBracketsMode.NlBrackets]: text =>
    text.replace(bracketReplacerReg, (_all, $1, $2) => ` ${$1 ? '\n' : ''}(${$2})`) as never,

  [CmComTextSquareBracketsMode.Remove]: text => text.replace(bracketReplacerReg, '') as never,
};

export const takeTextBlockIncorrects = (text: string | und = '', eeStore: EeStorePack): IIncorrects => {
  let mistakes = '';

  text = takeTextBlockCorrectBrackets(text);

  const textWithIncorrects = text.replace(makeRegExp(notAvailSymbolsReg), all => {
    mistakes += all;
    return `[${all}]`;
  });

  if (textWithIncorrects !== text) {
    return { errors: [{ message: `Присутствуют недопустимые символы: ${mistakes}\n\n${textWithIncorrects}\n\n` }] };
  }

  const { level } = cmTransformToReadableText(text, TextCase.Capitalize, CmComTextSquareBracketsMode.AsIs);

  if (level) {
    const pre = level < 0 ? 'открывающ' : 'закрывающ';
    const text = smylib.declension(Math.abs(level), `${pre}уюся кавычку`, `${pre}ихся кавычки`, `${pre}ихся кавычек`);

    return {
      warnings: [
        {
          message: `В тексте присутствует непарное количество ковычек.\nНеобходимо добавить ${Math.abs(level)} ${text}\n\n`,
        },
      ],
    };
  }

  return eeTextIncorrects(text, eeStore);
};
