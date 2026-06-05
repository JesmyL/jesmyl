import { smylib } from './SMyLib';

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

export const enLowerLettersSet = new Set(smylib.keys(transcriptEnLetterToRuDict));

export const transcriptEnToRuText = (text: string) => {
  let transcriptedText = '';
  text = text.toLowerCase();

  for (const letter of text) {
    transcriptedText += transcriptEnToRuSymbolDict[letter as 'a'] ?? letter;
  }

  return transcriptedText;
};
