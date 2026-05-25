import { CmComNewlinerStrConfig } from 'shared/api';

export const takeCmComNewlinerRepeatConfig = (nlConfig: CmComNewlinerStrConfig.whole | nil, repeati: number) =>
  nlConfig?.split('/', repeati + 1)[repeati] as CmComNewlinerStrConfig.repeat | nil;

export const takeCmComNewlinerLineConfig = (
  nlConfig: CmComNewlinerStrConfig.whole | nil,
  repeati: number,
  linei: number,
) =>
  takeCmComNewlinerRepeatConfig(nlConfig, repeati)?.split(' ', linei + 1)[linei] as CmComNewlinerStrConfig.line | nil;

export const cmComNewlinerLineConfigToSet = (
  nlConfig: CmComNewlinerStrConfig.whole | nil,
  repeati: number,
  linei: number,
) => {
  const set = new Set<number>();
  const lineConfig = takeCmComNewlinerLineConfig(nlConfig, repeati, linei);

  if (!lineConfig?.length) return set;

  let tenPlus = 0;
  let dir: 1 | -1 = 1;

  lineConfig.split('').forEach(numStr => {
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

  new Set(Array.from(setOrArr ?? []).sort((a, b) => Math.abs(a) - Math.abs(b))).forEach(num => {
    while (Math.abs(num) >= tenMinus) {
      tenMinus += 10;
      result += '.';
    }

    result += `${num < 0 ? '-' : ''}${`${num}`.at(-1)}`;
  });

  return result as CmComNewlinerStrConfig.line;
};
