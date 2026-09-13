import { useLiveQuery } from 'dexie-react-hooks';
import { BibleTbcvKey, BibleTranslateName } from 'shared/model/bible';
import { BibleTitleCodei } from 'shared/model/bible/enums';
import { extractNumber, itIt, itNumSort } from 'shared/utils';
import { checkIsArray, checkIsNotNil } from 'shared/utils/checkIs';
import {
  forEachObjectEntries,
  objectEntries,
  objectFromEntries,
  objectKeys,
  objectLength,
} from 'shared/utils/object.utils';
import { textToUpperCase } from 'shared/utils/string.utils';
import { takeBibleLangBooks } from '../const/bibleTitles';
import { translateDescriptions, translateLanguage } from '../const/consts';
import { bibleTbcvEncode, makeBibleTbcvPrefix } from '../lib/tbcv.parser';
import {
  BibleBroadcastAnyAddress,
  BibleBroadcastJoinAddress,
  BibleBroadcastTextMapBlock,
  BibleChapteri,
  BibleSingleAddressCode,
} from '../model/base';
import { bibleTBCVTranslatesIDB } from '../state/bibleIDB';
import { useBibleShowTranslatesValue } from './translates';

export const useBibleSlideMapBlocks = (
  address: BibleBroadcastAnyAddress | nil,
  isSetFirstVerse?: boolean,
  isSetVerseNum?: boolean,
) => {
  const showTranslates = useBibleShowTranslatesValue();
  const isSingleAddress = checkIsArray(address);

  let liveQuerySelector;
  let showBooksCount = 0;
  let showChaptersCount = 0;
  let shownVersesTBCVKeySet: Set<BibleTbcvKey> | und;
  let showBooki: BibleTitleCodei | und;
  let showChapteri: BibleChapteri | und;

  if (isSetFirstVerse) {
    const booki = isSingleAddress ? address[0] : Math.min(...objectKeys(address));
    const chapteri = isSingleAddress ? address[1] : Math.min(...objectKeys(address?.[booki]));
    const versei = isSingleAddress ? address[2] : Math.min(...(address?.[booki]?.[chapteri] ?? []));

    liveQuerySelector = () =>
      bibleTBCVTranslatesIDB.tb.list
        .where('k')
        .equals(bibleTbcvEncode(showTranslates[0], booki, chapteri, versei))
        .toArray();
  } else if (isSingleAddress) {
    const [booki, chapteri, versei] = address;
    shownVersesTBCVKeySet = new Set(showTranslates.map(tName => bibleTbcvEncode(tName, booki, chapteri, versei)));

    showBooki = booki;
    showChapteri = chapteri;
  } else {
    const selectedTbcvKeys: BibleTbcvKey[] = [];

    forEachObjectEntries(address, (bookiStr, chapterDict) => {
      showBooksCount++;
      showBooki ??= extractNumber(bookiStr);

      forEachObjectEntries(chapterDict, (chapteriStr, verses) => {
        showChaptersCount++;
        showChapteri ??= extractNumber(chapteriStr);

        verses?.forEach(versei => {
          showTranslates.forEach(tName => {
            selectedTbcvKeys.push(bibleTbcvEncode(tName, extractNumber(bookiStr), extractNumber(chapteriStr), versei));
          });
        });
      });
    });

    if (showTranslates.length === 1) {
      shownVersesTBCVKeySet = new Set(selectedTbcvKeys);
    } else if (showBooksCount !== 1 || showChaptersCount !== 1) {
      liveQuerySelector = () => bibleTBCVTranslatesIDB.tb.list.where('k').anyOf(selectedTbcvKeys).toArray();
    }
  }

  const [biblei, chapteri, versei] = isSingleAddress ? address : [];
  const joinAddress = isSingleAddress ? null : address;

  if (!liveQuerySelector) {
    const showTranslatePrefixes =
      checkIsNotNil(showBooki) && checkIsNotNil(showChapteri)
        ? (showTranslates.length === 1 ? showTranslates.slice(0, 1) : showTranslates).map(tName =>
            makeBibleTbcvPrefix(tName, showBooki, showChapteri),
          )
        : [];

    liveQuerySelector = () =>
      bibleTBCVTranslatesIDB.tb.list.where('k').startsWithAnyOf(showTranslatePrefixes).toArray();
  }

  const verses = useLiveQuery(liveQuerySelector, [showTranslates.join('/'), biblei, chapteri, versei, joinAddress]);

  const tbcvTextDict = objectFromEntries(
    shownVersesTBCVKeySet
      ? verses?.filter(({ k }) => shownVersesTBCVKeySet.has(k)).map(({ k, v }) => [k, v])
      : verses?.map(({ k, v }) => [k, v]),
  );

  const len = objectLength(tbcvTextDict);
  if (!len) return [];

  if (isSingleAddress) {
    return makeSlideSingleAddressMapBlocks(showTranslates, tbcvTextDict, address, isSetFirstVerse, isSetVerseNum);
  }

  return makeSlideJoinedAddressMapBlocks(showTranslates, tbcvTextDict, address, isSetFirstVerse, isSetVerseNum);
};

const makeSlideSingleAddressMapBlocks = (
  showTranslates: BibleTranslateName[],
  tbcvTextDict: Record<string, string>,
  address: BibleSingleAddressCode,
  isSetFirstVerse?: boolean,
  isSetVerseNum?: boolean,
): BibleBroadcastTextMapBlock[] => {
  const [booki, chapteri, versei] = address;
  if (isSetFirstVerse) {
    const verseNum = isSetVerseNum === false || showTranslates.length > 1 ? '' : versei + 1 + '. ';

    return [
      {
        texts: [
          { text: `${verseNum}${tbcvTextDict[bibleTbcvEncode(showTranslates[0], booki, chapteri, versei)] ?? ''}` },
        ],
      },
    ];
  }

  return showTranslates.map(tName => {
    const verseText = tbcvTextDict[bibleTbcvEncode(tName, booki, chapteri, versei)];
    const texts = [{ text: verseText ? verseText : '' }];

    return showTranslates.length > 1
      ? {
          texts,
          head: `${translateDescriptions[tName]} (${textToUpperCase(tName)})`,
        }
      : { texts };
  });
};

const makeSlideJoinedAddressMapBlocks = (
  showTranslates: BibleTranslateName[],
  tbcvTextDict: Record<BibleTbcvKey, string>,
  joinAddress: BibleBroadcastJoinAddress | nil,
  isSetFirstVerse?: boolean,
  isSetVerseNum?: boolean,
): BibleBroadcastTextMapBlock[] => {
  if (!joinAddress) return [];

  const pasteText = (tName: BibleTranslateName, isEllipsis?: boolean): { address: string; text: string }[] => {
    const langi = translateLanguage[tName];

    return objectEntries(joinAddress)
      .map(([booki, book], _, booka) => {
        const bookEntries = objectEntries(book);

        return {
          address:
            isSetVerseNum !== false && booka.length > 1
              ? takeBibleLangBooks(langi)[booki].full +
                (bookEntries.length > 1 ? '' : ', ' + (1 + +bookEntries[0][0])) +
                ':\n'
              : '',

          text:
            bookEntries
              .map(([chapteri, chapter = []], _, chaptera) => {
                const chapterPrefix = isSetVerseNum === false ? '' : chaptera.length > 1 ? +chapteri + 1 + ':' : '';

                return chapter
                  .slice(0)
                  .sort(itNumSort)
                  .map(versei => {
                    const verse =
                      tbcvTextDict[bibleTbcvEncode(tName, extractNumber(booki), extractNumber(chapteri), versei)];

                    return verse ? (isSetVerseNum === false ? verse : `${chapterPrefix}${versei + 1}. ${verse}`) : '';
                  })
                  .filter(itIt)
                  .join('\n');
              })
              .join('\n') + (isEllipsis ? '...' : ''),
        };
      })
      .filter(checkIsNotNil);
  };

  if (isSetFirstVerse || showTranslates.length < 2)
    return [
      {
        texts: pasteText(showTranslates[0], isSetFirstVerse),
      },
    ];

  return showTranslates.map(tName => {
    return {
      head: `${translateDescriptions[tName]} (${textToUpperCase(tName)})`,
      texts: pasteText(tName),
    };
  });
};
