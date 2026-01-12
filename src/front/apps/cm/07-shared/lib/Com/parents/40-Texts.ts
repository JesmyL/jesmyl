import { CmBroadcastSlideGrouperOrdWithList } from 'shared/model/cm/broadcast';
import { CmComChords } from './30-Chords';

export class CmComTexts extends CmComChords {
  takeSolidTextLines = (isAddLastSlideStars = false) => {
    const ordLines: CmBroadcastSlideGrouperOrdWithList = [];
    let isLastTextedLinei = 0;
    let ordLinesi = -1;

    this.orders?.forEach(ord => {
      if (ord.me.isInherit) {
        const lastOrdLinesi = ordLines.length - 1;
        ordLines[lastOrdLinesi].list = ordLines[lastOrdLinesi].list.concat(ord.repeatedText().split('\n'));
        return;
      }

      const isRealText = ord.isRealText();

      ordLinesi++;
      if (isRealText) isLastTextedLinei = ordLinesi;

      ordLines.push({
        ord,
        list: isRealText ? ord.repeatedText().split('\n') : [ord.me.header()],
      });
    });

    if (ordLines[isLastTextedLinei] == null) return ordLines;

    ordLines[isLastTextedLinei].isLastSlide = true;

    if (isAddLastSlideStars) {
      const list = ordLines[isLastTextedLinei].list;
      list[list.length - 1] += `\n* * *`;
    }

    return ordLines;
  };
}
