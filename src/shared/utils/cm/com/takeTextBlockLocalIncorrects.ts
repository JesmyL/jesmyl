import { makeRegExp } from 'regexpert';
import { CmComBracketLevelHolder, CmComTextSquareBracketsMode } from 'shared/api';
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

type IncorrectsTranslate = (key: BaseLocaleKey, interpolation: Record<string, string | number | boolean>) => string;

export const translateIncorrects: IncorrectsTranslate = (key, interpolation) =>
  translateBase(it => {
    const text = it[key];
    return typeof text === 'string' ? text : '';
  }, interpolation);

export const makeTextBlockForIncorrects = (text: string) =>
  text.replace(
    makeRegExp(
      `/([${displayableTextBlockSymbolsStr}${slavicLowerLettersStr}${doubleQuotesStr}${singleQuotesStr}${replacableAvailableCharsStr}]) \\[\\[?|](?=\\n|$)/gi`,
    ),
    (all, $1) => (all.endsWith(']') ? ')' : $1 + ' ('),
  );

export const takeTextBlockLocalIncorrects = (
  text: string = '',
  extraAvailSymbols = '',
  translate: IncorrectsTranslate = translateIncorrects,
): IIncorrects | null => {
  let mistakes = '';
  const availSymbols = `${doubleQuotesStr}${singleQuotesStr}${replacableAvailableCharsStr}` as const;
  const levelHolder: CmComBracketLevelHolder = { level: 0 };

  text = makeTextBlockForIncorrects(text);

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

  return null;
};
