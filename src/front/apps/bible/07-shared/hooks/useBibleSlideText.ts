import { BibleTranslateName, Langi } from 'shared/api';
import { itIt, itNumSort } from 'shared/utils';
import { checkIsArray, checkIsNotNil } from 'shared/utils/checkIs';
import { objectEntries } from 'shared/utils/object.utils';
import { textToUpperCase } from 'shared/utils/string.utils';
import { takeBibleLangBooks } from '../const/bibleTitles';
import { translateDescriptions, translateLanguage } from '../const/consts';
import { useBibleTranslatesContext } from '../contexts/translates';
import {
  BibleBroadcastAnyAddress,
  BibleBroadcastJoinAddress,
  BibleBroadcastTextMapBlock,
  BibleSingleAddressCode,
} from '../model/base';
import { BibleBookTranslates } from '../state/TranslatesContext';
import { useBibleShowTranslatesValue } from './translates';

export const useBibleSlideMapBlocks = (
  address: BibleBroadcastAnyAddress | nil,
  isSetFirstTranslate?: boolean,
  isSetAddress?: boolean,
) => {
  const showTranslates = useBibleShowTranslatesValue();
  const translates = useBibleTranslatesContext();

  if (checkIsArray(address))
    return makeSlideSingleAddressMapBlocks(showTranslates, translates, address, isSetFirstTranslate, isSetAddress);

  return makeSlideJoinedAddressMapBlocks(showTranslates, translates, address, isSetFirstTranslate, isSetAddress);
};

const makeSlideSingleAddressMapBlocks = (
  showTranslates: BibleTranslateName[],
  translates: BibleBookTranslates,
  [booki, chapteri, versei]: BibleSingleAddressCode,
  isSetFirstTranslate?: boolean,
  isSetAddress?: boolean,
): BibleBroadcastTextMapBlock[] => {
  const verseNum = isSetAddress === false || showTranslates.length > 1 ? '' : versei + 1 + '. ';

  if (isSetFirstTranslate)
    return [
      {
        texts: [{ text: `${verseNum}${translates[showTranslates[0]]?.chapters?.[booki]?.[chapteri]?.[versei] ?? ''}` }],
      },
    ];

  return showTranslates.map(tName => {
    const text = translates[tName]?.chapters?.[booki]?.[chapteri]?.[versei];
    const texts = [{ text: text ? verseNum + text : '' }];

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
  translates: BibleBookTranslates,
  joinAddress: BibleBroadcastJoinAddress | nil,
  isSetFirstTranslate?: boolean,
  isSetAddress?: boolean,
): BibleBroadcastTextMapBlock[] => {
  if (!joinAddress) return [];

  const pasteText = (
    langi: Langi,
    chapters: ((string[] | und)[] | nil)[] | und,
  ): { address: string; text: string }[] => {
    if (!chapters) return [];

    return objectEntries(joinAddress)
      .map(([booki, book], _, booka) => {
        if (!chapters[booki]?.[0]?.[0]) return;
        const bookEntries = objectEntries(book);

        return {
          address:
            isSetAddress !== false && booka.length > 1
              ? takeBibleLangBooks(langi)[booki].full +
                (bookEntries.length > 1 ? '' : ', ' + (1 + +bookEntries[0][0])) +
                ':\n'
              : '',

          text: bookEntries
            .map(([chapteri, chapter = []], _, chaptera) => {
              const chapterPrefix = isSetAddress === false ? '' : chaptera.length > 1 ? +chapteri + 1 + ':' : '';

              return chapter
                .slice(0)
                .sort(itNumSort)
                .map(
                  versei =>
                    (isSetAddress === false ? '' : `${chapterPrefix}${versei + 1}. `) +
                    (chapters[booki]?.[chapteri]?.[versei] ?? `${booki};${chapteri};${versei}`),
                )
                .filter(itIt)
                .join('\n');
            })
            .join('\n'),
        };
      })
      .filter(checkIsNotNil);
  };

  if (isSetFirstTranslate || showTranslates.length < 2)
    return [
      {
        texts: pasteText(translateLanguage[showTranslates[0]], translates[showTranslates[0]]?.chapters),
      },
    ];

  return showTranslates.map(tName => {
    return {
      head: `${translateDescriptions[tName]} (${textToUpperCase(tName)})`,
      texts: pasteText(translateLanguage[tName], translates[tName]?.chapters),
    };
  });
};
