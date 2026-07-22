import { BibleTranslateName, CmComLangi } from 'shared/api';
import { objectKeys } from 'shared/utils/object.utils';
import { BibleBooki } from '../model/base';

export const translateDescriptions: Record<BibleTranslateName, string> = {
  [BibleTranslateName.rst]: 'Русский Синодальный Перевод',
  [BibleTranslateName.nrt]: 'Новый русский перевод',
  [BibleTranslateName.kas]: 'Новый Завет. Перевод Кассиана (Безобразова)',
  [BibleTranslateName.kzb]: 'Казахский перевод',
};

export const translateLanguage: Record<BibleTranslateName, CmComLangi> = {
  [BibleTranslateName.rst]: CmComLangi.Ru,
  [BibleTranslateName.nrt]: CmComLangi.Ru,
  [BibleTranslateName.kas]: CmComLangi.Ru,
  [BibleTranslateName.kzb]: CmComLangi.Kz,
};

export const bibleTranslateFilter: Record<BibleTranslateName, (booki: BibleBooki) => boolean> = {
  [BibleTranslateName.kas]: booki => booki < 39,
  [BibleTranslateName.rst]: () => false,
  [BibleTranslateName.nrt]: () => false,
  [BibleTranslateName.kzb]: () => false,
};

export const bibleAllTranslates = objectKeys(translateDescriptions);
