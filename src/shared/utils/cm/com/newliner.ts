import { CmComNewlinerStrConfig } from 'shared/api';

export const cmComNewlinerLineNewlinerConfigToSet = (nlConfig: CmComNewlinerStrConfig | nil, linei: number) => {
  const lineJoins = nlConfig?.split(' ')?.[linei];
  const set = new Set<number>();

  if (!lineJoins?.length) return set;

  let tenPlus = 0;
  let dir: 1 | -1 = 1;

  lineJoins.split('').forEach(numStr => {
    if (numStr === '-') dir = -1;
    else if (numStr === '.') tenPlus += 10;
    else {
      set.add((+numStr + tenPlus) * dir);
      dir = 1;
    }
  });

  return set;
};

export const cmComNewlinerLineSetToNewlinerConfig = (setOrArr: Set<number> | number[] | nil) => {
  let result = '';
  let tenMinus = 10;

  Array.from(setOrArr ?? [])
    .sort((a, b) => Math.abs(a) - Math.abs(b))
    .forEach(num => {
      while (num >= tenMinus) {
        tenMinus += 10;
        result += '.';
      }

      result += `${num < 0 ? '-' : ''}${`${num}`.at(-1)}`;
    });

  return result as CmComNewlinerStrConfig;
};
