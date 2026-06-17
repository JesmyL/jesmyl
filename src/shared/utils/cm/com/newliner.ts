import { makeRegExp } from 'regexpert';
import {
  CmComLineText,
  CmComNewlinerLinei,
  CmComNewlinerRepeati,
  CmComNewlinerStrConfig,
  CmComNewlinerWordi,
} from 'shared/api';
import { CmComNewlinerSymbolFreeUpperCaseLine } from 'shared/model/cm/broadcast';
import { textToUpperCase } from 'shared/utils/string.utils';
import { slavicLowerLettersStr } from './const';

export const takeCmComNewlinerRepeatFullConfig = (
  nlConfig: CmComNewlinerStrConfig.whole | nil,
  linei: CmComNewlinerLinei,
) => (takeCmComNewlinerLineFullConfig(nlConfig)[linei]?.split('/') ?? []) as (CmComNewlinerStrConfig.repeat | nil)[];

export const takeCmComNewlinerRepeatConfig = (
  nlConfig: CmComNewlinerStrConfig.whole | nil,
  linei: CmComNewlinerLinei,
  repeati: CmComNewlinerRepeati,
) =>
  takeCmComNewlinerLineConfig(nlConfig, linei)?.split('/', repeati + 1)[repeati] as CmComNewlinerStrConfig.repeat | nil;

export const takeCmComNewlinerLineFullConfig = (nlConfig: CmComNewlinerStrConfig.whole | nil) =>
  (nlConfig?.split(' ') ?? []) as (CmComNewlinerStrConfig.line | nil)[];

export const takeCmComNewlinerLineConfig = (nlConfig: CmComNewlinerStrConfig.whole | nil, linei: CmComNewlinerLinei) =>
  nlConfig?.split(' ', linei + 1)[linei] as CmComNewlinerStrConfig.line | nil;

export const cmComNewlinerLineConfigToSet = (
  nlConfig: CmComNewlinerStrConfig.whole | nil,
  linei: CmComNewlinerLinei,
  repeati: CmComNewlinerRepeati,
) => {
  const set = new Set<CmComNewlinerWordi>();
  const lineRepeatConfig = takeCmComNewlinerRepeatConfig(nlConfig, linei, repeati);

  if (!lineRepeatConfig?.length) return set;

  let tenPlus = 0;
  let dir: 1 | -1 = 1;

  lineRepeatConfig.split('').forEach(numStr => {
    if (numStr === '-') dir = -1;
    else if (numStr === '.') tenPlus += 10;
    else {
      set.add((+numStr + tenPlus) * dir);
      dir = 1;
    }
  });

  return set;
};

export const cmComNewlinerLineSetToNewlinerConfig = (
  setOrArr: Set<CmComNewlinerWordi> | CmComNewlinerWordi[] | nil,
) => {
  let result = '';
  let tenMinus = 10;

  new Set(Array.from(setOrArr ?? []).sort((a, b) => Math.abs(a) - Math.abs(b))).forEach(num => {
    while (Math.abs(num) >= tenMinus) {
      tenMinus += 10;
      result += '.';
    }

    result += `${num < 0 ? '-' : ''}${`${num}`.at(-1)}`;
  });

  return result as CmComNewlinerStrConfig.repeat;
};

const reg = makeRegExp(`/[^- ${slavicLowerLettersStr}]/gi`);
export const cmComNewlinerSymbolFreeUpperCaseText = (line: CmComLineText): CmComNewlinerSymbolFreeUpperCaseLine =>
  `_${textToUpperCase(line.replace(reg, '') as CmComLineText)}` as const;
