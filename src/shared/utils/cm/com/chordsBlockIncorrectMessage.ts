import { makeRegExp } from 'regexpert';
import { IIncorrects } from 'shared/model/cm/Incorrects';
import { textedChordRegsLazy } from './const';

export const chordsBlockIncorrectMessage = (value: string | und, isHardChords: Bool): IIncorrects => {
  const incorrectChords: string[] = [];
  const hardChords: string[] = [];

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
        const { hardModificators } = textedChordRegsLazy().transform(match);

        if (hardModificators) {
          hardChords.push(chord);
          return `{${chord}}`;
        }
      }

      return chord;
    })
    .join('');

  let message = '';

  if (incorrectChords.length) {
    const few = incorrectChords.length > 1;
    message += `Аккорд${few ? 'ы' : ''} "${incorrectChords.join('; ')}" не верно написан${few ? 'ы' : ''}:\n\n`;
  }

  if (hardChords.length) {
    const few = hardChords.length > 1;
    message += `Аккорд${few ? 'ы' : ''} "${hardChords.join('; ')}" слишком сложны${few ? 'е' : 'й'}:\n\n`;
  }

  if (!message) return {};

  return { errors: [{ message: `${message}${textWithIncorrects}\n\n` }] };
};
