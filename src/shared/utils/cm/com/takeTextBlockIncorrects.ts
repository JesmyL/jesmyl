import { makeRegExp } from 'regexpert';
import { CmComBracketLevelHolder, CmComTextSquareBracketsMode, EeStorePack } from 'shared/api';
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
  const availSymbols = `${doubleQuotesStr}${singleQuotesStr}${replacableAvailableCharsStr}` as const;
  const levelHolder: CmComBracketLevelHolder = { level: 0 };

  text = text.replace(
    makeRegExp(`/([${displayableTextBlockSymbolsStr}${slavicLowerLettersStr}${availSymbols}]) \\[\\[?|](?=\\n|$)/gi`),
    (all, $1) => (all.endsWith(']') ? ')' : $1 + ' ('),
  );

  const textWithIncorrects = text.replace(makeRegExp(`/[^${displayableTextBlockCharsStr}${availSymbols}]+/gi`), all => {
    mistakes += all;
    return `[${all}]`;
  });

  if (textWithIncorrects !== text) {
    return { errors: [{ message: `Присутствуют недопустимые символы: ${mistakes}\n\n${textWithIncorrects}\n\n` }] };
  }

  const { level } = cmTransformToReadableText(levelHolder, text, TextCase.Capitalize, CmComTextSquareBracketsMode.AsIs);

  if (level) {
    const pre = level < 0 ? 'открывающ' : 'закрывающ';
    const absLevel = Math.abs(level);
    const text = smylib.declension(absLevel, `${pre}ую кавычку`, `${pre}их кавычки`, `${pre}их кавычек`);

    return {
      warnings: [
        {
          message: `В тексте присутствует непарное количество кавычек.\nНеобходимо добавить ${absLevel} ${text}\n\n`,
        },
      ],
    };
  }

  return eeTextIncorrects(text, eeStore);
};
