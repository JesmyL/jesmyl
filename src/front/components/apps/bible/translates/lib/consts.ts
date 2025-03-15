import { bibleTitles } from '$bible/hooks/bibleTitlesJson';
import { BibleBooki } from '$bible/model';
import { BibleTranslateName } from 'shared/api';

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

export const bibleLowerBooks = bibleTitles.titles.map(book => book.map(title => title.toLowerCase()));
