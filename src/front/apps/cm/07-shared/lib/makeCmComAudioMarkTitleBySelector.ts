import { mylib } from '#shared/lib/my-lib';
import { CmCom, CmComOrder } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import { CmComAudioMarkPack, CmComAudioMarkSelector, CmComOrderWid } from 'shared/api';

export const makeCmComAudioMarkTitleBySelector = <LineTitle extends string | React.ReactNode = string>(
  time: number,
  com: CmCom,
  selector: CmComAudioMarkSelector | nil,
  marks: CmComAudioMarkPack | nil,
  isMakeTitleTextWithoutRepeatsCompute = false,
  mapLineTitle: (repeats: string, text: string) => LineTitle = (repeats, text) => `${repeats} ${text}` as never,
) => {
  if (mylib.isArr(selector)) {
    const ord = com.getOrderBySelector(selector[0]);
    if (marks == null || ord == null) return { title: '?', ord: null };

    const visibleOrders = com.visibleOrders() ?? [];
    const repeats = computeOrdRepeats(time, marks, selector[0]);

    return {
      title: `#${visibleOrders.indexOf(ord) + 1} ${ord.me.header()}${Math.trunc(selector[0]) === selector[0] ? '' : '+'} ${repeats > 1 ? `×${repeats}` : ''}`,
      ord,
    };
  }

  let title = `${selector || (time === 0 ? 'Начало' : '...')}` as LineTitle;

  if (isMakeTitleTextWithoutRepeatsCompute) return { title, ord: null };

  let repeats = 1;
  let lastSelector: CmComAudioMarkSelector[0] = CmComOrderWid.never;

  if (marks != null) {
    mylib.keys(marks).find(itTime => {
      if (marks[itTime] == null || mylib.isStr(marks[itTime])) return time === +itTime;

      if (lastSelector !== marks[itTime][0]) repeats = 1;
      else repeats++;

      lastSelector = marks[itTime][0];

      return time === +itTime;
    });
  }

  const ord = com.getOrderBySelector(lastSelector);

  if (selector && !mylib.isNaN(+selector) && ord) {
    let lines = ord.repeatedText().replace(makeRegExp('/([/\\\\]|&nbsp;)/g'), ' ').split('\n');
    let lineText = lines[+selector - 1];

    if (lineText == null) {
      let nextOrd: CmComOrder | nil = ord.me.next;

      while (nextOrd != null) {
        lines = lines.concat(nextOrd.repeatedText().replace(makeRegExp('/([/\\\\]|&nbsp;)/g'), ' ').split('\n'));

        if ((lineText = lines[+selector - 1]) != null) break;
        nextOrd = nextOrd?.me.next;
      }
    }

    title = lineText
      ? mapLineTitle(`${repeats > 1 ? `${'/'.repeat(repeats)} ` : ''}`, `${selector} ${lineText}`)
      : title;
  }

  return {
    title,
    ord,
  };
};

const computeOrdRepeats = (time: number, marks: CmComAudioMarkPack, selector: CmComAudioMarkSelector[0]) => {
  let repeats = 0;

  mylib.keys(marks).find(itTime => {
    if (marks[itTime] == null || mylib.isStr(marks[itTime])) return false;

    if (selector === marks[itTime][0]) repeats++;
    else repeats = 0;

    return time === +itTime;
  });

  return repeats;
};
