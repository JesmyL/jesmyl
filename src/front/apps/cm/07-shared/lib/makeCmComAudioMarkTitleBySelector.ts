import { mylib } from '#shared/lib/my-lib';
import { CmCom, CmComOrder } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import {
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComAudioMarkSelector,
  CmComOrderWid,
  CmComWid,
} from 'shared/api';
import { nbsp } from 'shared/utils/cm/com/const';

export const makeCmComAudioMarkTitleAsLineSelector = (linei: number) => `~${linei + 1}`;
export const makeCmComAudioMarkLineiFromSelector = (selector: string) => +selector.slice(1) - 1;

export const checkIsCmComAudioMarkTitleIsLineSelector = (selector: CmComAudioMarkSelector | nil): selector is string =>
  mylib.isStr(selector) && selector.startsWith('~') && !mylib.isNaN(+selector.slice(1));

export const makeCmComAudioMarkTitleEmptySelector = (
  selector: string | nil,
  cMarks: (number | `${number}`)[] | CmComAudioMarkPack[CmComWid] | nil,
  time: CmComAudioMarkPackTime,
) => {
  if (selector) return selector;

  if (+time === 0) return 'Вступление';

  cMarks = cMarks != null ? (mylib.isArr(cMarks) ? cMarks : mylib.keys(cMarks)) : (cMarks ?? []);

  if (+cMarks[cMarks.length - 1] === +time) return 'Финал';

  return 'Проигрыш';
};

export const makeCmComAudioMarkTitleBySelector = <LineTitle extends string | React.ReactNode = string>(
  time: CmComAudioMarkPackTime,
  com: CmCom,
  selector: CmComAudioMarkSelector | nil,
  comMarks: CmComAudioMarkPack[CmComWid] | nil,
  mapLineTitle: (repeats: string, text: string) => LineTitle = (repeats, text) => `${repeats} ${text}` as never,
  mapStringTitle?: (title: string) => string,
): {
  ord: CmComOrder | nil;
  title: LineTitle;
  fullTitle?: LineTitle;
  isReplaceBlockText?: boolean;
  isShortTime: boolean;
} => {
  const comMarkKeys = mylib.keys(comMarks ?? {});
  const isShortTime = Math.abs(time - +(comMarkKeys[comMarkKeys.indexOf(`${time}`) + 1] ?? 0)) < 1;

  if (mylib.isArr(selector)) {
    const { ord, visibleOrdi } = com.getOrderBySelector(selector[0]);
    if (comMarks == null || ord == null) return { title: '?' as never, ord: null, isShortTime };

    const repeats = computeOrdRepeats(time, comMarks, selector[0]);

    return {
      ord,
      isShortTime,
      title:
        `#${visibleOrdi + 1} ${ord.me.header()}${Math.trunc(selector[0]) === selector[0] ? '' : '+'}${repeats > 1 ? ` ×${repeats}` : ''}` as never,
    };
  }

  let repeats = 1;
  let lastSelector: CmComAudioMarkSelector[0] = CmComOrderWid.never;

  if (comMarks != null) {
    comMarkKeys.find(itTime => {
      if (comMarks[itTime] == null || mylib.isStr(comMarks[itTime])) return time === +itTime;

      if (lastSelector !== comMarks[itTime][0]) repeats = 1;
      else repeats++;

      lastSelector = comMarks[itTime][0];

      return time === +itTime;
    });
  }

  const { ord, visibleOrdi } = com.getOrderBySelector(lastSelector);
  let title = makeCmComAudioMarkTitleEmptySelector(selector, comMarks, time);

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
      ? `#${visibleOrdi + 1}:${linei + 1} ${lineText.replace(makeRegExp(`/ *([/\\\\]|${nbsp})+ */g`), ' ').trim()}`
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

const computeOrdRepeats = (
  time: CmComAudioMarkPackTime,
  cMarks: CmComAudioMarkPack[CmComWid],
  selector: CmComAudioMarkSelector[0],
) => {
  let repeats = 0;

  if (cMarks)
    mylib.keys(cMarks).find(itTime => {
      if (cMarks[itTime] == null || mylib.isStr(cMarks[itTime])) return false;

      if (selector === cMarks[itTime][0]) repeats++;
      else repeats = 0;

      return time === +itTime;
    });

  return repeats;
};
