import { mylib, MyLib } from '#shared/lib/my-lib';
import { bibleTitles } from '../const/bibleTitles';
import { useBibleTranslatesContext } from '../contexts/translates';
import { BibleBroadcastAnyAddress } from '../model/base';
import { useBibleAddressBooki } from './address/books';
import { useBibleShowTranslatesValue } from './translates';

const numSortFunc = (a: number, b: number) => a - b;

export const useBibleCurrentChapterList = () => {
  const currentBooki = useBibleAddressBooki();
  const showTranslates = useBibleShowTranslatesValue();
  return useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki];
};
export const useBibleBookList = () => bibleTitles.titles;

export const makeBibleJoinedAddressText = (
  addressCode: BibleBroadcastAnyAddress | nil,
  titleVariant: 'full' | 'short' = 'full',
) => {
  if (addressCode == null) return '';

  if (mylib.isArr(addressCode)) {
    const [booki, chapteri, versei] = addressCode;
    return `${bibleTitles.titles[booki][titleVariant]} ${chapteri + 1}:${versei + 1}`;
  }

  return MyLib.entries(addressCode)
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
