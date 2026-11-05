import { makeRegExp } from 'regexpert';
import { IIncorrects } from 'shared/model/cm/Incorrects';
import { textedChordRegsLazy } from './const';

export const takeChordsBlockIncorrects = (value: string | und, isHardChords: Bool) => {
  const incorrectChords: string[] = [];
  const complexChords: string[] = [];

  const textWithIncorrects = (value || '')
    .trim()
    .split(makeRegExp('/([\\n\\s ]+)/'))
    .map(chord => {
      if (!chord.trim()) return chord;
      const match = chord.match(textedChordRegsLazy().regExp);

      if (!match) {
        incorrectChords.push(chord);
        return `[${chord}]`;
      }

      if (!isHardChords) {
        const {
          hardModificators,
          lightModificators,
          hardModificators_lastRepeat,
          lightModificators_lastRepeat,
        } = textedChordRegsLazy().transform(match);

        if (hardModificators || lightModificators || hardModificators_lastRepeat || lightModificators_lastRepeat) {
          complexChords.push(chord);
          return `{${chord}}`;
        }
      }

      return chord;
    })
    .join('');

  return { incorrectChords, complexChords, textWithIncorrects };
};

export const chordsBlockIncorrectMessage = (value: string | und, isHardChords: Bool): IIncorrects => {
  const { incorrectChords, complexChords, textWithIncorrects } = takeChordsBlockIncorrects(value, isHardChords);

  let message = '';

  if (incorrectChords.length) {
    const few = incorrectChords.length > 1;
    message += `Аккорд${few ? 'ы' : ''} "${incorrectChords.join('; ')}" не верно написан${few ? 'ы' : ''}:\n\n`;
  }

  if (complexChords.length) {
    const few = complexChords.length > 1;
    message += `Аккорд${few ? 'ы' : ''} "${complexChords.join('; ')}" слишком сложны${few ? 'е' : 'й'}:\n\n`;
  }

  if (!message) return {};

  return { errors: [{ message: `${message}${textWithIncorrects}\n\n` }] };
};
