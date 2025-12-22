import { makeRegExp } from 'regexpert';
import { EeStorePack } from 'shared/api';
import { IIncorrect, IIncorrects } from 'shared/model/cm/Incorrects';
import { slavicLowerLettersStr, uaDifferentLowerLettersStr } from './const';

export const eeTextIncorrects = (text: string | nil, eeStore: EeStorePack): IIncorrects => {
  if (typeof text !== 'string') return {};
  const errors: IIncorrect[] = [];
  const warnings: IIncorrect[] = [];
  const unknowns: IIncorrect[] = [];

  text.split(makeRegExp(`/[^${slavicLowerLettersStr}]/i`)).forEach(async realWord => {
    if (!realWord.match(makeRegExp('/[её]/i')) || realWord.match(makeRegExp(`/[${uaDifferentLowerLettersStr}]/i`)))
      return;
    const lower = realWord.toLowerCase();
    const word = lower.replace(makeRegExp('/ё/g'), 'е');
    const parts = lower.split(makeRegExp('/[а-дж-я]*([её])/')).filter(p => p);

    if (eeStore[word] == null) {
      unknowns.push({
        message:
          `Слово '${realWord}' ещё не встречалось среди существующих песен. Проверь, пожалуйста, ` +
          `правильность написания букв ё/е, встречающихся в нём.`,
      });
      return;
    }

    [eeStore[word]].flat().forEach((type, typei, typea) => {
      const isE = parts[typei] === 'е';
      const info = (code: 0 | 1) => ({
        message: `${['Н', 'Возможно н'][code]}е верно указана ${
          typea.length > 1 ? `${typei + 1}-я из букв ё/е` : `буква ${parts[typei]}`
        } в слове '${realWord}'.`,
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
