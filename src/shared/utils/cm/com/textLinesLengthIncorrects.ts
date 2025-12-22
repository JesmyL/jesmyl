import { makeRegExp } from 'regexpert';
import { IIncorrects } from 'shared/model/cm/Incorrects';
import { clearTextLineForLengthCompute } from './clearTextLineForLengthCompute';
import { takeTextLineOverLengthIndex } from './takeTextLineOverLengthIndex';

export const textLinesLengthIncorrects = (text: string, maxLength: number): IIncorrects | und => {
  const linei = takeTextLineOverLengthIndex(text, maxLength);

  if (linei > -1) {
    const line = clearTextLineForLengthCompute(text.split(makeRegExp(`/\n/`))[linei]);
    return {
      errors: [
        {
          message: `Строка ${linei + 1} слишком длинная:\n${line.slice(0, maxLength)}/---/${line.slice(maxLength)}`,
        },
      ],
    };
  }
};
