import { makeRegExp } from 'regexpert';
import {
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComAudioMarkSelector,
  CmComOrderWid,
  CmComWid,
} from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { checkIsArray, checkIsNaN, checkIsString } from 'shared/utils/checkIs';
import { nbsp } from 'shared/utils/cm/com/const';
import { objectKeys } from 'shared/utils/object.utils';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { comBlockKindsConfig } from 'shared/values/cm/block-kinds/comBlockKinds.config';
import { CmComOrder } from './Order';

export const makeCmComAudioMarkTitleAsLineSelector = (linei: number) => `~${linei + 1}`;
export const makeCmComAudioMarkLineiFromSelector = (selector: string) => +selector.slice(1) - 1;

export const checkIsCmComAudioMarkTitleIsLineSelector = (selector: CmComAudioMarkSelector | nil): selector is string =>
  checkIsString(selector) && selector.startsWith('~') && !checkIsNaN(+selector.slice(1));

const enterBlockKind = comBlockKindsConfig.find(it => it.key === CmComBlockKindKey.Enter);
const finalBlockKind = comBlockKindsConfig.find(it => it.key === CmComBlockKindKey.Final);
const playBlockKind = comBlockKindsConfig.find(it => it.key === CmComBlockKindKey.Play);

export const makeCmComAudioMarkTitleEmptySelector =
  !enterBlockKind || !finalBlockKind || !playBlockKind
    ? (selector: string | nil) => selector || '---'
    : (
        selector: string | nil,
        cMarks: (number | `${number}`)[] | CmComAudioMarkPack[CmComWid] | nil,
        time: CmComAudioMarkPackTime,
        language: number,
      ) => {
        if (selector) return selector;

        if (+time === 0) return enterBlockKind.title[language];

        cMarks = cMarks != null ? (checkIsArray(cMarks) ? cMarks : objectKeys(cMarks)) : (cMarks ?? []);

        if (+cMarks[cMarks.length - 1] === +time) return finalBlockKind.title[language];

        return playBlockKind.title[language];
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
  const comMarkKeys = objectKeys(comMarks);
  const isShortTime = Math.abs(time - +(comMarkKeys[comMarkKeys.indexOf(`${time}`) + 1] ?? 0)) < 1;

  if (checkIsArray(selector)) {
    const { ord, visibleOrdi } = com.getOrd(selector[0]);
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
      if (comMarks[itTime] == null || checkIsString(comMarks[itTime])) return time === +itTime;

      if (lastSelector !== comMarks[itTime][0]) repeats = 1;
      else repeats++;

      lastSelector = comMarks[itTime][0];

      return time === +itTime;
    });
  }

  const { ord, visibleOrdi } = com.getOrd(lastSelector);
  let title = makeCmComAudioMarkTitleEmptySelector(selector, comMarks, time, com.langi ?? 0);

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
    objectKeys(cMarks).find(itTime => {
      if (cMarks[itTime] == null || checkIsString(cMarks[itTime])) return false;

      if (selector === cMarks[itTime][0]) repeats++;
      else repeats = 0;

      return time === +itTime;
    });

  return repeats;
};
