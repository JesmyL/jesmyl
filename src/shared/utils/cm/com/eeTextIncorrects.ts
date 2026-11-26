import { makeRegExp } from 'regexpert';
import { EeStorePack } from 'shared/api';
import { IIncorrect, IIncorrects } from 'shared/model/cm/Incorrects';
import { slavicLowerLettersStr, uaDifferentLowerLettersStr } from './const';

const eLettersReg_i = makeRegExp('/[её]/i');
const uaDifferentReg_i = makeRegExp(`/[${uaDifferentLowerLettersStr}]/i`);
const eLetterReg_g = makeRegExp('/ё/g');
const partsSplitReg_g = makeRegExp('/[а-дж-я]*([её])/');
const eLettersScanReg_gi = makeRegExp('/[её]/gi');

const makeCorrectWord = (word: string, types: number[]) => {
  let ei = 0;

  return word.replace(eLettersScanReg_gi, letter => {
    const type = types[ei++];
    const isLower = letter === letter.toLowerCase();

    if (type === 1) return isLower ? 'е' : 'Е';
    if (type === 2) return isLower ? 'ё' : 'Ё';
    return letter;
  });
};

export const eeTextIncorrects = (text: string | nil, eeStore: EeStorePack): IIncorrects => {
  if (typeof text !== 'string') return {};
  const errors: IIncorrect[] = [];
  const warnings: IIncorrect[] = [];
  const unknowns: IIncorrect[] = [];
  const wordOccurrences = new Map<string, number>();

  text.split(makeRegExp(`/[^${slavicLowerLettersStr}]/i`)).forEach(realWord => {
    if (!realWord.match(eLettersReg_i) || realWord.match(uaDifferentReg_i)) return;
    const lower = realWord.toLowerCase();
    const word = lower.replace(eLetterReg_g, 'е');
    const parts = lower.split(partsSplitReg_g).filter(p => p);
    const occurrence = wordOccurrences.get(realWord) ?? 0;
    wordOccurrences.set(realWord, occurrence + 1);

    if (eeStore[word] == null) {
      unknowns.push({
        message:
          `Слово '${realWord}' ещё не встречалось среди существующих песен. Проверь, пожалуйста, ` +
          `правильность написания букв ё/е, встречающихся в нём.`,
      });
      return;
    }

    const types = [eeStore[word]].flat();
    const correct = makeCorrectWord(realWord, types);

    types.forEach((type, typei, typea) => {
      const isE = parts[typei] === 'е';
      const info = (code: 0 | 1) => ({
        message: `${['Н', 'Возможно н'][code]}е верно указана ${
          typea.length > 1 ? `${typei + 1}-я из букв ё/е` : `буква ${parts[typei]}`
        } в слове '${realWord}'.`,
        ...(code === 0 ? { word: realWord, wordOccurrence: occurrence, correct } : {}),
      });

      if (type === 0) {
        if (isE) warnings.push(info(1));
      } else {
        if (isE) {
          if (type === 2) errors.push(info(0));
        } else if (type === 1) errors.push(info(0));
      }
    });
  });

  return { errors, warnings, unknowns };
};
