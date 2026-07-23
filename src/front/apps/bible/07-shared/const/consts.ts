import { BibleTranslateName, Langi } from 'shared/api';
import { objectKeys } from 'shared/utils/object.utils';
import { BibleBooki } from '../model/base';

export const translateDescriptions: Record<BibleTranslateName, string> = {
  [BibleTranslateName.rst]: 'Русский Синодальный Перевод',
  [BibleTranslateName.nrt]: 'Новый русский перевод',
  [BibleTranslateName.kas]: 'Новый Завет. Перевод Кассиана (Безобразова)',
  [BibleTranslateName.kzb]: 'Казахский перевод',
};

export const translateLanguage: Record<BibleTranslateName, Langi> = {
  [BibleTranslateName.rst]: Langi.Ru,
  [BibleTranslateName.nrt]: Langi.Ru,
  [BibleTranslateName.kas]: Langi.Ru,
  [BibleTranslateName.kzb]: Langi.Kz,
};

export const bibleTranslateFilter: Record<BibleTranslateName, (booki: BibleBooki) => boolean> = {
  [BibleTranslateName.kas]: booki => booki < 39,
  [BibleTranslateName.rst]: () => false,
  [BibleTranslateName.nrt]: () => false,
  [BibleTranslateName.kzb]: () => false,
};

export const bibleAllTranslates = objectKeys(translateDescriptions);
