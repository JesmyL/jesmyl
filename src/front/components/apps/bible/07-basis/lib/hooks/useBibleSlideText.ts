import { mylib, MyLib } from '#shared/lib/my-lib';
import { BibleBookTranslates } from '$bible/basis/contexts/TranslatesContext';
import { translateDescriptions } from '$bible/basis/lib/const/consts';
import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import { useBibleShowTranslatesValue } from '$bible/basis/lib/hooks/translates';
import {
  BibleSingleAddressCode,
  BibleTranslationAnyAddress,
  BibleTranslationJoinAddress,
} from '$bible/basis/model/base';
import { verseTranslateTitleCssClassName } from '$bible/translations/complect';
import { BibleTranslateName } from 'shared/api';
import { itIt } from 'shared/utils';
import { bibleTitles } from '../const/bibleTitles';

const numSortFunc = (a: number, b: number) => a - b;

export const useBibleSlideText = (
  address: BibleTranslationAnyAddress | nil,
  isSetFirstTranslate?: boolean,
  isSetAddress?: boolean,
) => {
  const showTranslates = useBibleShowTranslatesValue();
  const translates = useBibleTranslatesContext();

  if (mylib.isArr(address))
    return makeSlideSingleAddressText(showTranslates, translates, address, isSetFirstTranslate, isSetAddress);

  return makeSlideJoinedAddressText(showTranslates, translates, address, isSetFirstTranslate, isSetAddress);
};

const makeSlideSingleAddressText = (
  showTranslates: BibleTranslateName[],
  translates: BibleBookTranslates,
  [booki, chapteri, versei]: BibleSingleAddressCode,
  isSetFirstTranslate?: boolean,
  isSetAddress?: boolean,
) => {
  const verseNum = isSetAddress === false || showTranslates.length > 1 ? '' : versei + 1 + '. ';

  if (isSetFirstTranslate)
    return `${verseNum}${translates[showTranslates[0]]?.chapters?.[booki]?.[chapteri]?.[versei] ?? ''}`;

  return showTranslates.reduce((verse, tName) => {
    const text = translates[tName]?.chapters?.[booki]?.[chapteri]?.[versei];
    return text
      ? showTranslates.length > 1
        ? `${verse}<div><h3 class="${verseTranslateTitleCssClassName}">${
            translateDescriptions[tName]
          } (${tName.toUpperCase()})</h3>${text ? verseNum + text : ''}</div>`
        : text
      : verse;
  }, '');
};

const makeSlideJoinedAddressText = (
  showTranslates: BibleTranslateName[],
  translates: BibleBookTranslates,
  joinAddress: BibleTranslationJoinAddress | nil,
  isSetFirstTranslate?: boolean,
  isSetAddress?: boolean,
) => {
  if (joinAddress == null) return '';

  const pasteText = (chapters: ((string[] | und)[] | nil)[] | und) => {
    if (chapters === undefined) return '';

    return MyLib.entries(joinAddress)
      .map(([booki, book], _, booka) => {
        const bookEntries = MyLib.entries(book);

        if (!chapters[booki]?.[0]?.[0]) return '';

        return (
          (isSetAddress !== false && booka.length > 1
            ? bibleTitles.titles[booki].full + (bookEntries.length > 1 ? '' : ', ' + (1 + +bookEntries[0][0])) + ':\n'
            : '') +
          bookEntries
            .map(([chapteri, chapter], _, chaptera) => {
              const chapterPrefix = isSetAddress === false ? '' : chaptera.length > 1 ? +chapteri + 1 + ':' : '';
              return chapter
                .slice(0)
                .sort(numSortFunc)
                .map(
                  versei =>
                    (isSetAddress === false ? '' : `${chapterPrefix}${versei + 1}. `) +
                    (chapters[booki]![chapteri]?.[versei] ?? ''),
                )
                .filter(itIt)
                .join('\n');
            })
            .join('\n')
        );
      })
      .filter(itIt)
      .join('\n\n');
  };

  if (isSetFirstTranslate) return pasteText(translates[showTranslates[0]]?.chapters);

  return showTranslates
    .map(tName => {
      const text = pasteText(translates[tName]?.chapters);

      return (
        text &&
        (showTranslates.length > 1
          ? `<h3 class="${verseTranslateTitleCssClassName}">${
              translateDescriptions[tName]
            } (${tName.toUpperCase()})</h3>`
          : '') +
          '<br>' +
          text
      );
    })
    .join('</br>');
};
