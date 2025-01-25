import { BibleTranslateName } from 'shared/api';
import { BibleBooki, BibleChapteri, BibleVersei, BibleVersePath, BibleVersePathParts } from '../model';

export const bibleDefaultTranslates = [BibleTranslateName.rst];
export const bibleOtherTranslates = [BibleTranslateName.nrt, BibleTranslateName.kas];
export const bibleAllTranslates = [...bibleDefaultTranslates, ...bibleOtherTranslates];

export const translateDescriptions: Record<BibleTranslateName, string> = {
  [BibleTranslateName.rst]: 'Русский Синодальный Перевод',
  [BibleTranslateName.nrt]: 'Новый русский перевод',
  [BibleTranslateName.kas]: 'Новый Завет. Перевод Кассиана (Безобразова)',
};

export const translateFilter: Record<BibleTranslateName, (booki: BibleBooki) => boolean> = {
  [BibleTranslateName.kas]: booki => booki < 39,
  [BibleTranslateName.rst]: () => false,
  [BibleTranslateName.nrt]: () => false,
};

const numbersChars: string[] = [];
const charNumbers: Record<string, number> = {};
for (let i = 0; i < 200; i++) {
  const char = String.fromCharCode(i + 162);
  numbersChars.push(char);
  charNumbers[char] = i;
}

export const makeBibleVersePathKeyFromParts = (parts: BibleVersePathParts): BibleVersePath => {
  return `${numbersChars[parts[1]]}${numbersChars[parts[2]]}${numbersChars[parts[3]]}${parts[0]}`;
};

export const makeBibleVersePathKey = (
  tName: BibleTranslateName,
  booki: BibleBooki,
  chapteri: BibleChapteri,
  versei: BibleVersei,
): BibleVersePath => {
  return `${numbersChars[booki]}${numbersChars[chapteri]}${numbersChars[versei]}${tName}`;
};

export const makeBibleVersePathParts = (path: BibleVersePath): BibleVersePathParts => {
  const translate = path.slice(3);
  const chars = path.slice(0, -3).split('');

  return [translate, charNumbers[chars[0]], charNumbers[chars[1]], charNumbers[chars[2]]] as never;
};
