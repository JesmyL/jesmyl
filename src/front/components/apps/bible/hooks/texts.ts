import { MyLib } from '#shared/lib/my-lib';
import { BibleBooki, BibleChapteri, BibleTranslationJoinAddress, BibleVersei } from '@bible/model';
import { translateDescriptions } from '@bible/translates/lib/consts';
import { useBibleTranslatesContext } from '@bible/translates/lib/contexts';
import { useBibleShowTranslatesValue } from '@bible/translates/lib/hooks';
import { verseTranslateTitleCssClassName } from '@bible/translations/complect';
import { itIt } from 'shared/utils';
import { useBibleAddressBooki } from './address/books';
import { bibleTitles } from './bibleTitlesJson';

const numSortFunc = (a: number, b: number) => a - b;

export const useLoadBibleChaptersCombine = () => {
  const combine = useBibleTranslatesContext().rst;

  // useEffect(() => {
  //   if (combine?.chapters != null) return;

  //   const timeout = setTimeout(() => soki.makeInitialRequests('bible'), 1000);

  //   return () => clearTimeout(timeout);
  // }, [combine?.chapters]);

  return combine;
};

export const useBibleCurrentChapterList = () => {
  const currentBooki = useBibleAddressBooki();
  const showTranslates = useBibleShowTranslatesValue();
  return useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki];
};
export const useBibleBookList = () => bibleTitles.titles;

export const useBibleSingleSlideText = (
  booki: BibleBooki,
  chapteri: BibleChapteri,
  versei: BibleVersei,
  isSetFirstTranslate?: boolean,
  isSetAddress?: boolean,
) => {
  const showTranslates = useBibleShowTranslatesValue();
  const translates = useBibleTranslatesContext();

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

export const useBibleSlideText = () => {};

export const useBibleJoinedSlideText = (
  joinAddress: BibleTranslationJoinAddress | nil,
  isSetFirstTranslate?: boolean,
  isSetAddress?: boolean,
) => {
  const showTranslates = useBibleShowTranslatesValue();
  const translates = useBibleTranslatesContext();

  if (joinAddress == null) return '';

  const pasteText = (chapters: ((string[] | und)[] | nil)[] | und) => {
    if (chapters === undefined) return '';

    return MyLib.entries(joinAddress)
      .map(([booki, book], _, booka) => {
        const bookEntries = MyLib.entries(book);

        if (!chapters[booki]?.[0]?.[0]) return '';

        return (
          (isSetAddress !== false && booka.length > 1
            ? bibleTitles.titles[booki][0] + (bookEntries.length > 1 ? '' : ', ' + (1 + +bookEntries[0][0])) + ':\n'
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

export const useBibleSimpleAddressText = (
  booki: BibleBooki,
  chapteri: BibleChapteri,
  versei: BibleVersei,
  titleVariant: 0 | 1 = 0,
) => {
  return `${bibleTitles.titles[booki][titleVariant]} ${chapteri + 1}:${versei + 1}`;
};

export const useBibleJoinedAddressText = (joinAddress: BibleTranslationJoinAddress | nil, titleVariant: 0 | 1 = 0) => {
  if (joinAddress == null) return '';

  return MyLib.entries(joinAddress)
    .map(([booki, book]) => {
      return (
        bibleTitles.titles[booki][titleVariant] +
        ' ' +
        MyLib.entries(book)
          .map(([chapteri, chapter]) => {
            let versesStr = '';
            const verses = [...chapter].sort(numSortFunc);

            for (let i = 0; i < verses.length; i++) {
              const versei = verses[i];

              if (i === 0) {
                versesStr += versei + 1;
                continue;
              }

              if (versei !== verses[i - 1] + 1) versesStr += ',' + (versei + 1);
              else if (versei !== verses[i + 1] - 1) versesStr += '-' + (versei + 1);
            }

            return 1 + +chapteri + ':' + versesStr;
          })
          .join(', ')
      );
    })
    .join('; ');
};
