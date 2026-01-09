import { CmBroadcastSlideGrouperOrdWithList } from 'shared/model/cm/broadcast';
import { CmComChords } from './30-Chords';

export class CmComTexts extends CmComChords {
  takeSolidTextLines = (isSetLineNumbers = false, isAddLastSlideStars = false) => {
    const ordLines: CmBroadcastSlideGrouperOrdWithList = [];

    this.orders?.forEach(ord => {
      const previ = ordLines.length - 1;

      if (ord.me.isInherit) {
        ordLines[previ].list = ordLines[previ].list.concat(ord.repeatedText().split('\n'));
        return;
      }

      if (ord.isRealText()) {
        ordLines.push({ list: ord.repeatedText().split('\n'), ord });
      }
    });

    const lines = isSetLineNumbers
      ? ordLines.map(({ list, ord }) => ({ ord, list: list.map((line, linei) => `${linei + 1}: ${line}`) }))
      : ordLines;

    if (isAddLastSlideStars) {
      const list = lines[lines.length - 1].list;
      list[list.length - 1] += `\n* * *`;
    }

    return lines;
  };
}
