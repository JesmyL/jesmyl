import { translateDynamic } from '#basis/locale';
import { Langi } from 'shared/api';
import { itNumSort } from 'shared/utils';
import { checkIsArray } from 'shared/utils/checkIs';
import { mapObjectEntries } from 'shared/utils/object.utils';
import { useBibleTranslatesContext } from '../contexts/translates';
import { BibleBroadcastAnyAddress } from '../model/base';
import { useBibleAddressBooki } from './address/books';
import { useBibleShowTranslatesValue } from './translates';

export const useBibleCurrentChapterList = () => {
  const currentBooki = useBibleAddressBooki();
  const showTranslates = useBibleShowTranslatesValue();
  return useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki];
};

export const makeBibleJoinedAddressText = (
  langi: Langi,
  addressCode: BibleBroadcastAnyAddress | nil,
  titleVariant: 'full' | 'short' = 'full',
) => {
  if (addressCode == null) return '';

  if (checkIsArray(addressCode)) {
    const [booki, chapteri, versei] = addressCode;
    const title = translateDynamic(langi)(it => it.bible.title[titleVariant][booki]);
    return `${title} ${chapteri + 1}:${versei + 1}`;
  }

  return mapObjectEntries(addressCode, (booki, book) => {
    const title = translateDynamic(langi)(it => it.bible.title[titleVariant][booki]);

    return (
      title +
      ' ' +
      mapObjectEntries(book, (chapteri, chapter) => {
        let versesStr = '';
        const verses = [...chapter].sort(itNumSort);

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
      }).join(', ')
    );
  }).join('; ');
};
