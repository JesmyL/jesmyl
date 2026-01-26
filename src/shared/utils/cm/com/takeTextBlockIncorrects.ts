import { makeRegExp } from 'regexpert';
import { EeStorePack } from 'shared/api';
import { IIncorrects } from 'shared/model/cm/Incorrects';
import { smylib } from 'shared/utils/SMyLib';
import { displayableTextBlockCharsStr, doubleQuotesStr, replacableAvailableCharsStr, singleQuotesStr } from './const';
import { eeTextIncorrects } from './eeTextIncorrects';
import { transformToDisplayedText } from './transformToDisplayedText';

export const takeTextBlockIncorrects = (text: string | und = '', eeStore: EeStorePack): IIncorrects => {
  let mistakes = '';

  const textWithIncorrects = text.replace(
    makeRegExp(
      `/[^${displayableTextBlockCharsStr}${doubleQuotesStr}${singleQuotesStr}${replacableAvailableCharsStr}|]+/gi`,
    ),
    all => {
      mistakes += all;
      return `[${all}]`;
    },
  );

  if (textWithIncorrects !== text)
    return { errors: [{ message: `Присутствуют недопустимые символы: ${mistakes}\n\n${textWithIncorrects}\n\n` }] };

  const { level } = transformToDisplayedText(text);

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
