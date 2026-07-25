import { translateBase } from '#basis/locale';
import { BibleTranslateName, Langi } from 'shared/api';
import { forEachObjectEntries, objectKeys } from 'shared/utils/object.utils';
import { BibleBooki } from '../model/base';

export const translateLanguage: Record<BibleTranslateName, Langi> = {
  [BibleTranslateName.rst]: Langi.Ru,
  [BibleTranslateName.nrt]: Langi.Ru,
  [BibleTranslateName.kas]: Langi.Ru,
  [BibleTranslateName.kzb]: Langi.Kz,
};

export const translateDescriptions = {} as Record<BibleTranslateName, string>;

forEachObjectEntries(translateLanguage, tName => {
  translateDescriptions[tName] = translateBase(it => it.bible.trs[tName]);
});

export const bibleTranslateFilter: Record<BibleTranslateName, (booki: BibleBooki) => boolean> = {
  [BibleTranslateName.kas]: booki => booki < 39,
  [BibleTranslateName.rst]: () => false,
  [BibleTranslateName.nrt]: () => false,
  [BibleTranslateName.kzb]: () => false,
};

export const bibleAllTranslates = objectKeys(translateDescriptions);
