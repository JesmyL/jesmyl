import { mylib } from '#shared/lib/my-lib';
import { CmCom, CmComOrder } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import { CmComAudioMarkPack, CmComAudioMarkSelector, CmComOrderWid } from 'shared/api';

export const makeCmComAudioMarkTitleAsLineSelector = (linei: number) => `~${linei + 1}`;
export const makeCmComAudioMarkLineiFromSelector = (selector: string) => +selector.slice(1) - 1;

export const checkIsCmComAudioMarkTitleIsLineSelector = (selector: CmComAudioMarkSelector | nil): selector is string =>
  mylib.isStr(selector) && selector.startsWith('~') && !mylib.isNaN(+selector.slice(1));

export const makeCmComAudioMarkTitleEmptySelector = (
  selector: string | nil,
  marks: (number | `${number}`)[] | CmComAudioMarkPack | nil,
  time: number,
) => {
  if (selector) return selector;

  if (+time === 0) return 'Вступление';

  marks = marks != null ? (mylib.isArr(marks) ? marks : mylib.keys(marks)) : (marks ?? []);

  if (+marks[marks.length - 1] === +time) return 'Финал';

  return 'Проигрыш';
};

export const makeCmComAudioMarkTitleBySelector = <LineTitle extends string | React.ReactNode = string>(
  time: number,
  com: CmCom,
  selector: CmComAudioMarkSelector | nil,
  marks: CmComAudioMarkPack | nil,
  mapLineTitle: (repeats: string, text: string) => LineTitle = (repeats, text) => `${repeats} ${text}` as never,
  mapStringTitle?: (title: string) => string,
): {
  ord: CmComOrder | nil;
  title: LineTitle;
  fullTitle?: LineTitle;
  isReplaceBlockText?: boolean;
  isShortTime: boolean;
} => {
  const markKeys = mylib.keys(marks ?? {});
  const isShortTime = Math.abs(time - +(markKeys[markKeys.indexOf(`${time}`) + 1] ?? 0)) < 1;

  if (mylib.isArr(selector)) {
    const { ord, visibleOrdi } = com.getOrderBySelector(selector[0]);
    if (marks == null || ord == null) return { title: '?' as never, ord: null, isShortTime };

    const repeats = computeOrdRepeats(time, marks, selector[0]);

    return {
      ord,
      isShortTime,
      title:
        `#${visibleOrdi + 1} ${ord.me.header()}${Math.trunc(selector[0]) === selector[0] ? '' : '+'}${repeats > 1 ? ` ×${repeats}` : ''}` as never,
    };
  }

  let repeats = 1;
  let lastSelector: CmComAudioMarkSelector[0] = CmComOrderWid.never;

  if (marks != null) {
    markKeys.find(itTime => {
      if (marks[itTime] == null || mylib.isStr(marks[itTime])) return time === +itTime;

      if (lastSelector !== marks[itTime][0]) repeats = 1;
      else repeats++;

      lastSelector = marks[itTime][0];

      return time === +itTime;
    });
  }

  const { ord, visibleOrdi } = com.getOrderBySelector(lastSelector);
  let title = makeCmComAudioMarkTitleEmptySelector(selector, marks, time);

  if (checkIsCmComAudioMarkTitleIsLineSelector(selector) && ord) {
    let lines = ord.transformedText().split('\n');
    const linei = makeCmComAudioMarkLineiFromSelector(selector);
    let lineText = lines[linei];

    if (lineText == null) {
      let nextOrd: CmComOrder | nil = ord.me.next;

      while (nextOrd?.isInSolidLineWithInvisibles()) {
        if (nextOrd.isVisible) lines = lines.concat(nextOrd.transformedText().split('\n'));

        if ((lineText = lines[linei]) != null) break;
        nextOrd = nextOrd?.me.next;
      }
    }

    title = lineText
      ? `#${visibleOrdi + 1}:${linei + 1} ${lineText.replace(makeRegExp('/ *([/\\\\]|&nbsp;)+ */g'), ' ').trim()}`
      : title;
  }

  const repeatsText = `${repeats > 1 ? `${'/'.repeat(repeats)} ` : ''}`;
  const isReplaceBlockText = title.startsWith('+');
  const fullTitle = title;

  if (isReplaceBlockText) title = title.split('\n', 1)[0];
  if (mapStringTitle) title = mapStringTitle(title);

  return {
    ord,
    isShortTime,
    isReplaceBlockText,
    fullTitle: fullTitle as never,
    title: (checkIsCmComAudioMarkTitleIsLineSelector(selector)
      ? mapLineTitle(repeatsText, title)
      : `${repeatsText} ${title}`) as never,
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
