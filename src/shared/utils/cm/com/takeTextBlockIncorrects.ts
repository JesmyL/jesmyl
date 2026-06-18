import { makeRegExp } from 'regexpert';
import { CmComLineText, EeStorePack } from 'shared/api';
import { IIncorrects } from 'shared/model/cm/Incorrects';
import { TextCase } from 'shared/model/common';
import { smylib } from 'shared/utils/SMyLib';
import { cmTransformToReadableLines } from '../transformToReadableText';
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
  `/([${displayableTextBlockSymbolsStr}${slavicLowerLettersStr}${availSymbols}]) \\[\\[?|](?=\\n|$)/g`,
);
const notAvailSymbolsReg = `/[^${displayableTextBlockCharsStr}${availSymbols}]+/gi` as const;

export const takeTextBlockCorrectBrackets = (text: string) =>
  text.replace(squareReplaceReg, (all, $1) => (all.endsWith(']') ? ')' : $1 + ' ('));

export const takeTextBlockReadableBracketsContent = (text: string) =>
  text.replace(makeRegExp('/\\s(\\[)?\\[([^\\]]*)]+/g'), (_all, $1, $2) => ` ${$1 ? '</br>' : ''}(${$2})`);

export const takeTextBlockWithoutSquareBracketsContent = (text: string) =>
  text.replace(makeRegExp('/\\s+\\[[^\\]]+]/g'), '') as CmComLineText;

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

  const { level } = cmTransformToReadableLines(text.split('\n'), TextCase.Capitalize);

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
