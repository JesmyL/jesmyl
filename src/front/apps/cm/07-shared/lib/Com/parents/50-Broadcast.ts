import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'regexpert';
import { CmComLineGroupingKind, cmComLineGroupingDefaultKinds } from 'shared/const/cm/comLineGroupingKind';
import { itIt } from 'shared/utils';
import { CmComTexts } from './40-Texts';

export class CmComBroadcast extends CmComTexts {
  makeSlideTexts(isIncluseEndStars = true, kind: number | und) {
    return this.makeSlideBlocks(kind).map(
      (lines, linesi, linesa) =>
        lines?.join('\n') + (isIncluseEndStars && linesa.length - 1 === linesi ? '\n* * *' : ''),
    );
  }

  makeSlideBlocks(kind: number | und) {
    const textBeats = this.orders
      ?.reduce((text, ord) => text + (!ord.isRealText() ? '' : (text ? '\n' : '') + ord.repeatedText()), '')
      .split(makeRegExp('/\\n/'));

    const texts = this.broadcastMap(kind)
      .map(peaceSize => textBeats?.splice(0, peaceSize))
      .filter(itIt);

    return texts;
  }

  broadcastMap = (kind: number | und, isPushChordedBlocks = false) => {
    const kindScalar = kind ?? this.broadcastPushKind;

    const slideKind = new CmComLineGroupingKind(
      mylib.isStr(kindScalar) ? kindScalar : cmComLineGroupingDefaultKinds[kindScalar],
    );

    let curr = 0;
    const orders = this.orders ?? [];
    const ordersLength = orders.length;
    const newlineReg = makeRegExp('/\\n/');

    for (let ordi = 0; ordi < ordersLength; ) {
      const ord = orders[ordi];

      if (!ord.isRealText()) {
        ordi++;
        if (isPushChordedBlocks && !ord.text) slideKind.fix(-1);
        continue;
      }

      curr += ord.text.split(newlineReg).length;
      let nextOrd = orders[++ordi];

      while (nextOrd?.me.isInherit) {
        if (nextOrd.isRealText()) curr += nextOrd.text.split(newlineReg).length;

        nextOrd = orders[++ordi];
      }

      slideKind.fix(curr);
      curr = 0;
    }

    return slideKind.list;
  };
}
