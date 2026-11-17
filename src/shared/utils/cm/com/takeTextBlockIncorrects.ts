import { makeRegExp } from 'regexpert';
import { CmComBracketLevelHolder, CmComTextSquareBracketsMode, EeStorePack } from 'shared/api';
import { IIncorrects } from 'shared/model/cm/Incorrects';
import { TextCase } from 'shared/model/common';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { translateBase } from 'shared/utils/locale/base';
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

/** Переводчик базовой локали: ключ и значения подстановки; бэк передаёт сюда свой русский словарь. */
type IncorrectsTranslate = (key: BaseLocaleKey, interpolation: Record<string, string | number | boolean>) => string;

const translateIncorrects: IncorrectsTranslate = (key, interpolation) =>
  translateBase(it => {
    // Ключи проверок строковые: записи словаря сюда не попадают, и пустая строка страхует от смены типа ключа.
    const text = it[key];
    return typeof text === 'string' ? text : '';
  }, interpolation);

export const takeTextBlockIncorrects = (
  text: string | und = '',
  eeStore: EeStorePack,
  extraAvailSymbols = '',
  translate: IncorrectsTranslate = translateIncorrects,
): IIncorrects => {
  let mistakes = '';
  const availSymbols = `${doubleQuotesStr}${singleQuotesStr}${replacableAvailableCharsStr}` as const;
  const levelHolder: CmComBracketLevelHolder = { level: 0 };

  text = text.replace(
    makeRegExp(`/([${displayableTextBlockSymbolsStr}${slavicLowerLettersStr}${availSymbols}]) \\[\\[?|](?=\\n|$)/gi`),
    (all, $1) => (all.endsWith(']') ? ')' : $1 + ' ('),
  );

  // Недопустимые символы: extraAvailSymbols расширяет набор для частных случаев (например, « — » в названии кома), не трогая текстовые блоки
  const textWithIncorrects = text.replace(
    makeRegExp(`/[^${displayableTextBlockCharsStr}${availSymbols}${extraAvailSymbols}]+/gi`),
    all => {
      mistakes += all;
      return `[${all}]`;
    },
  );

  if (textWithIncorrects !== text) {
    return {
      errors: [
        {
          message: translate(BaseLocaleKey.CmIncorrectSymbolsPresent, { m: mistakes, t: textWithIncorrects }) + '\n\n',
        },
      ],
    };
  }

  const { level } = cmTransformToReadableText(levelHolder, text, TextCase.Capitalize, CmComTextSquareBracketsMode.AsIs);

  if (level) {
    const absLevel = Math.abs(level);

    return {
      warnings: [
        {
          message: translate(BaseLocaleKey.CmUnpairedQuotesWarning, { n: absLevel, o: level < 0 }) + '\n\n',
        },
      ],
    };
  }

  return eeTextIncorrects(text, eeStore);
};
