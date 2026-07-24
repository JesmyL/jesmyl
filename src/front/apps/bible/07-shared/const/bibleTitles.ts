import { takeDynamicLanguageAtom } from '#basis/state/locale';
import { Langi } from 'shared/api';
import { langCodeDict } from 'shared/const/+locale';
import { BibleTitleCodei } from 'shared/model/bible/enums';
import { extractNumber, iife } from 'shared/utils';
import { checkIsNotNil, checkIsNumber } from 'shared/utils/checkIs';
import { forEachObjectEntries } from 'shared/utils/object.utils';

let color = '';

const bibleTitles = [
  'text-[#300570] dark:text-[#966BD6]',
  BibleTitleCodei.aБыт,
  BibleTitleCodei.Исх,
  BibleTitleCodei.Лев,
  BibleTitleCodei.Чис,
  BibleTitleCodei.Втор,

  'text-[#A56800] dark:text-[#FFB840]',
  BibleTitleCodei.Нав,
  BibleTitleCodei.Суд,
  BibleTitleCodei.Руф,
  BibleTitleCodei.Цар1,
  BibleTitleCodei.Цар2,
  BibleTitleCodei.Цар3,
  BibleTitleCodei.Цар4,
  BibleTitleCodei.Пар1,
  BibleTitleCodei.Пар2,
  BibleTitleCodei.Ездр,
  BibleTitleCodei.Неем,
  BibleTitleCodei.Есф,

  'text-[#007141] dark:text-[#61D7A4]',
  BibleTitleCodei.Иов,
  BibleTitleCodei.Пс,
  BibleTitleCodei.Прит,
  BibleTitleCodei.Еккл,
  BibleTitleCodei.Песн,

  'text-[#93002F] dark:text-[#F16D97]',
  BibleTitleCodei.Ис,
  BibleTitleCodei.Иер,
  BibleTitleCodei.Плач,
  BibleTitleCodei.Иез,
  BibleTitleCodei.Дан,

  'text-[#A56800] dark:text-[#FFCB73]',
  BibleTitleCodei.Ос,
  BibleTitleCodei.Иоил,
  BibleTitleCodei.Ам,
  BibleTitleCodei.Авд,
  BibleTitleCodei.Ион,
  BibleTitleCodei.Мих,
  BibleTitleCodei.Наум,
  BibleTitleCodei.Авв,
  BibleTitleCodei.Соф,
  BibleTitleCodei.Агг,
  BibleTitleCodei.Зах,
  BibleTitleCodei.Мал,

  'text-[#071C71] dark:text-[#66A3D1]',
  BibleTitleCodei.Мат,
  BibleTitleCodei.Мар,
  BibleTitleCodei.Лук,
  BibleTitleCodei.Ин,

  'text-[#9C0019] dark:text-[#F87085]',
  BibleTitleCodei.Деян,

  'text-[#3F046F] dark:text-[#A468D5]',
  BibleTitleCodei.Иак,
  BibleTitleCodei.Пет1,
  BibleTitleCodei.Пет2,
  BibleTitleCodei.Ин1,
  BibleTitleCodei.Ин2,
  BibleTitleCodei.Ин3,
  BibleTitleCodei.Иуд,

  'text-[#A5A500] dark:text-[#FFFF73]',
  BibleTitleCodei.Рим,
  BibleTitleCodei.Кор1,
  BibleTitleCodei.Кор2,
  BibleTitleCodei.Гал,
  BibleTitleCodei.Еф,
  BibleTitleCodei.Флп,
  BibleTitleCodei.Кол,
  BibleTitleCodei.Фес1,
  BibleTitleCodei.Фес2,
  BibleTitleCodei.Тим1,
  BibleTitleCodei.Тим2,
  BibleTitleCodei.Тит,
  BibleTitleCodei.Флм,
  BibleTitleCodei.Евр,

  'text-[#A51300] dark:text-[#FF8373]',
  BibleTitleCodei.Откр,
]
  .map(key => {
    if (checkIsNumber(key)) return { key, color };
    else color = key;
  })
  .filter(checkIsNotNil);

export const findIndexInBibleTitles = (langi: Langi, checker: (title: string) => boolean) => {
  return takeBibleLangBooks(langi).findIndex(({ lfull, lshort }) => checker(lfull) || checker(lshort));
};

const lowerTitleDict = {} as Record<Langi, Record<'lfull' | 'lshort' | 'full' | 'short' | 'color', string>[]>;

forEachObjectEntries(langCodeDict, langi => {
  takeDynamicLanguageAtom(extractNumber(langi)).subscribe(() => delete lowerTitleDict[langi]);
});

export const takeBibleLangBooks = (langi: Langi) =>
  (lowerTitleDict[langi] ??= iife(() => {
    try {
      const bookTranslations = takeDynamicLanguageAtom(langi).get().bible.title;

      return bibleTitles.map(book => ({
        color: book.color,
        full: bookTranslations.full[book.key],
        short: bookTranslations.short[book.key],
        lfull: bookTranslations.full[book.key].toLowerCase(),
        lshort: bookTranslations.short[book.key].toLowerCase(),
      }));
    } catch {
      return bibleTitles.map(it => ({
        color: it.color,
        full: '',
        short: '',
        lfull: '',
        lshort: '',
      }));
    }
  }));
