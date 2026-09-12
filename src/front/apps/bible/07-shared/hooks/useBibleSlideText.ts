import { useLiveQuery } from 'dexie-react-hooks';
import { BibleTbcvKey, BibleTranslateName } from 'shared/model/bible';
import { BibleTitleCodei } from 'shared/model/bible/enums';
import { extractNumber, itIt, itNumSort } from 'shared/utils';
import { checkIsArray, checkIsNotNil } from 'shared/utils/checkIs';
import { forEachObjectEntries, objectEntries, objectFromEntries, objectKeys } from 'shared/utils/object.utils';
import { textToUpperCase } from 'shared/utils/string.utils';
import { takeBibleLangBooks } from '../const/bibleTitles';
import { translateDescriptions, translateLanguage } from '../const/consts';
import { bibleTbcvEncode, makeBibleTbcvPrefix } from '../lib/tbcv.parser';
import {
  BibleBroadcastAnyAddress,
  BibleBroadcastJoinAddress,
  BibleBroadcastTextMapBlock,
  BibleChapteri,
  BibleVersei,
} from '../model/base';
import { bibleTBCVTranslatesIDB } from '../state/bibleIDB';
import { useBibleShowTranslatesValue } from './translates';

export const useBibleSlideMapBlocks = (
  address: BibleBroadcastAnyAddress | nil,
  isSetFirstVerse?: boolean,
  isSetVerseNum?: boolean,
) => {
  const showTranslates = useBibleShowTranslatesValue();

  let liveQuerySelector;
  let showLen = 0;
  let chaptersCount = 0;
  let shownVersesTBCVKeySet: Set<BibleTbcvKey> | und;

  if (checkIsArray(address)) {
    const [booki, chapteri, versei] = address;
    showLen = showTranslates.length;

    liveQuerySelector = () =>
      bibleTBCVTranslatesIDB.tb.list
        .where('k')
        .anyOf(showTranslates.map(tName => bibleTbcvEncode(tName, booki, chapteri, versei)))
        .toArray();
  } else {
    if (isSetFirstVerse) {
      const minBooki = Math.min(...objectKeys(address));
      const minChapteri = Math.min(...objectKeys(address?.[minBooki]));
      const minVersei = Math.min(...(address?.[minBooki]?.[minChapteri] ?? []));

      liveQuerySelector = () =>
        bibleTBCVTranslatesIDB.tb.list
          .where('k')
          .equals(bibleTbcvEncode(showTranslates[0], minBooki, minChapteri, minVersei))
          .toArray();
    } else {
      const selects: BibleTbcvKey[] = [];
      let lastBookiStr: `${BibleTitleCodei}`;
      let lastChapteriStr: `${BibleChapteri}`;

      forEachObjectEntries(address, (bookiStr, chapterDict) => {
        lastBookiStr = bookiStr;

        forEachObjectEntries(chapterDict, (chapteriStr, verses) => {
          if (showTranslates.length === 1) {
            chaptersCount++;
            lastChapteriStr = chapteriStr;
          }

          verses?.forEach(versei => {
            showTranslates.forEach(tName => {
              showLen++;
              selects.push(bibleTbcvEncode(tName, extractNumber(bookiStr), extractNumber(chapteriStr), versei));
            });
          });
        });
      });

      if (chaptersCount === 1) {
        shownVersesTBCVKeySet = new Set(selects);

        liveQuerySelector = () =>
          bibleTBCVTranslatesIDB.tb.list
            .where('k')
            .startsWith(
              makeBibleTbcvPrefix(showTranslates[0], extractNumber(lastBookiStr), extractNumber(lastChapteriStr)),
            )
            .toArray();
      } else {
        liveQuerySelector = () => bibleTBCVTranslatesIDB.tb.list.where('k').anyOf(selects).toArray();
      }
    }
  }

  const [biblei, chapteri, versei] = checkIsArray(address) ? address : [];
  const joinAddress = checkIsArray(address) ? null : address;

  const verses = useLiveQuery(liveQuerySelector, [showTranslates.join('/'), biblei, chapteri, versei, joinAddress]);

  if (checkIsArray(address) && verses?.length !== showLen) return [];

  if (checkIsArray(address)) {
    const tbcvTextDict = objectFromEntries(verses, ({ k, v }) => [k[0], v]);

    return makeSlideSingleAddressMapBlocks(showTranslates, tbcvTextDict, address[2], isSetFirstVerse, isSetVerseNum);
  }

  const tbcvTextDict = Object.fromEntries(
    (shownVersesTBCVKeySet
      ? verses?.map(({ k, v }) => (shownVersesTBCVKeySet.has(k) ? [[k, v]] : [])).flat()
      : verses?.map(({ k, v }) => [k, v])) ?? [],
  );
  return makeSlideJoinedAddressMapBlocks(showTranslates, tbcvTextDict, address, isSetFirstVerse, isSetVerseNum);
};

const makeSlideSingleAddressMapBlocks = (
  showTranslates: BibleTranslateName[],
  tbcvTextDict: Record<string, string>,
  versei: BibleVersei,
  isSetFirstVerse?: boolean,
  isSetVerseNum?: boolean,
): BibleBroadcastTextMapBlock[] => {
  if (isSetFirstVerse) {
    const verseNum = isSetVerseNum === false || showTranslates.length > 1 ? '' : versei + 1 + '. ';

    return [
      {
        texts: [{ text: `${verseNum}${tbcvTextDict[makeBibleTbcvPrefix(showTranslates[0])] ?? ''}` }],
      },
    ];
  }

  return showTranslates.map(tName => {
    const verseText = tbcvTextDict[makeBibleTbcvPrefix(tName)];
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

  const pasteText = (tName: BibleTranslateName): { address: string; text: string }[] => {
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

          text: bookEntries
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
            .join('\n'),
        };
      })
      .filter(checkIsNotNil);
  };

  if (isSetFirstVerse || showTranslates.length < 2)
    return [
      {
        texts: pasteText(showTranslates[0]),
      },
    ];

  return showTranslates.map(tName => {
    return {
      head: `${translateDescriptions[tName]} (${textToUpperCase(tName)})`,
      texts: pasteText(tName),
    };
  });
};
