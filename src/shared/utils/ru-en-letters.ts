import { mapObjectEntries, objectKeys } from './object.utils';

export const transcriptEnLetterToRuDict = {
  q: 'й',
  w: 'ц',
  e: 'у',
  r: 'к',
  t: 'е',
  y: 'н',
  u: 'г',
  i: 'ш',
  o: 'щ',
  p: 'з',
  a: 'ф',
  s: 'ы',
  d: 'в',
  f: 'а',
  g: 'п',
  h: 'р',
  j: 'о',
  k: 'л',
  l: 'д',
  z: 'я',
  x: 'ч',
  c: 'с',
  v: 'м',
  b: 'и',
  n: 'т',
  m: 'ь',
};

export const transcriptEnToRuSymbolDict = {
  '[': 'х',
  '{': 'Х',
  ']': 'ъ',
  '}': 'Ъ',

  ';': 'ж',
  ':': 'Ж',
  "'": 'э',
  '"': 'Э',

  ',': 'б',
  '<': 'Б',
  '.': 'ю',
  '>': 'Ю',
  ...transcriptEnLetterToRuDict,
};

export const transcriptEnSimilarLetterToRuDict = {
  a: 'а',
  b: 'б',
  v: 'в',
  g: 'г',
  d: 'д',
  e: 'е',
  x: 'ж',
  z: 'з',
  i: 'и',
  j: 'й',
  k: 'к',
  l: 'л',
  m: 'м',
  n: 'н',
  o: 'о',
  p: 'п',
  r: 'р',
  s: 'с',
  t: 'т',
  u: 'у',
  f: 'ф',
  h: 'х',
  c: 'ц',
  4: 'ч',
  C: 'ч',
  w: 'ш',
  W: 'щ',
  y: 'ы',
  1: 'ь',
  B: 'ь',
  "'": 'ь',
  E: 'э',
  q: 'ю',
  9: 'я',
  A: 'я',
};

export const transcriptSimilarEnToRuText = (text: string) => {
  let transcriptedText = '';

  for (const letter of text) {
    transcriptedText += transcriptEnSimilarLetterToRuDict[letter as 'a'] ?? letter;
  }

  return transcriptedText;
};

export const transcriptRuToEnSymbolDict = Object.fromEntries(
  mapObjectEntries(transcriptEnToRuSymbolDict, (en, ru) => [ru.toLowerCase(), en]),
);

export const enLowerLettersSet = new Set(objectKeys(transcriptEnLetterToRuDict));

export const transcriptEnToRuText = (lowerCaseText: string) => {
  let transcriptedText = '';

  for (const letter of lowerCaseText) {
    transcriptedText += transcriptEnToRuSymbolDict[letter as 'a'] ?? letter;
  }

  return transcriptedText;
};

export const transcriptRuToEnText = (lowerCaseText: string) => {
  let transcriptedText = '';

  for (const letter of lowerCaseText) {
    transcriptedText += transcriptRuToEnSymbolDict[letter] ?? letter;
  }

  return transcriptedText;
};
