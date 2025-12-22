import { makeRegExp } from 'regexpert';
import { IIncorrects } from 'shared/model/cm/Incorrects';
import { textedChordRegs } from './const';

export const chordsBlockIncorrectMessage = (value: string | und): IIncorrects => {
  const incorrectChords: string[] = [];
  const textWithIncorrects = (value || '')
    .trim()
    .split(makeRegExp('/([\\n\\s ]+)/'))
    .map(chord => {
      if (chord.trim() && !chord.match(textedChordRegs.regExp)) {
        incorrectChords.push(chord);
        return `[${chord}]`;
      }
      return chord;
    })
    .join('');
  const few = incorrectChords.length > 1;

  if (!incorrectChords.length) return {};

  return {
    errors: [
      {
        message:
          `Аккорд${few ? 'ы' : ''} "${incorrectChords.join('; ')}" не верно написан${few ? 'ы' : ''}:\n\n` +
          `${textWithIncorrects}\n\n`,
      },
    ],
  };
};
