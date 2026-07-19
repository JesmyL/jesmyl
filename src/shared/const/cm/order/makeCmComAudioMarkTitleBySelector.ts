import {
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComAudioMarkSelector,
  CmComLineiZero,
  CmComOrderWid,
  CmComOrderWidNever,
  HttpNumLeadLink,
} from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmBroadcastMonolineSlideLineSelectorId } from 'shared/model/cm/broadcast';
import { checkIsArray, checkIsNaN, checkIsStartsWith, checkIsString } from 'shared/utils/checkIs';
import { CmComOrdRepeatSlashPlacement, makeCmComOrderRepeats } from 'shared/utils/cm/order';
import { objectKeys } from 'shared/utils/object.utils';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { comBlockKindsConfig } from 'shared/values/cm/block-kinds/comBlockKinds.config';
import { CmComOrder } from './Order';

/** @deprecated */
export const makeCmComAudioMarkLineiFromSelector = (selector: CmBroadcastMonolineSlideLineSelectorId) =>
  selector[1] || CmComLineiZero;

/** @deprecated */
export const checkIsCmComAudioMarkTitleIsLineSelector = (selector: CmComAudioMarkSelector | nil): selector is string =>
  checkIsString(selector) && checkIsStartsWith(selector, '~') && !checkIsNaN(+selector.slice(1));

const enterBlockKind = comBlockKindsConfig.find(it => it.key === CmComBlockKindKey.Enter);
const finalBlockKind = comBlockKindsConfig.find(it => it.key === CmComBlockKindKey.Final);
const playBlockKind = comBlockKindsConfig.find(it => it.key === CmComBlockKindKey.Play);

export const makeCmComAudioMarkTitleEmptySelector =
  !enterBlockKind || !finalBlockKind || !playBlockKind
    ? (selector: string | nil) => selector || '---'
    : (
        selector: string | nil,
        cMarks: (number | `${number}`)[] | CmComAudioMarkPack[HttpNumLeadLink] | nil,
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
  comMarks: CmComAudioMarkPack[HttpNumLeadLink] | nil,
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
    if (!comMarks || !ord) return { title: '?' as never, ord: null, isShortTime };

    const repeats = computeOrdRepeats(time, comMarks, selector[0]);

    return {
      ord,
      isShortTime,
      title:
        `#${visibleOrdi + 1} ${ord.me.header()}${Math.trunc(selector[0]) === selector[0] ? '' : '+'}${repeats > 1 ? ` ×${repeats}` : ''}` as never,
    };
  }

  let repeats = 1;
  let lastSelector = CmComOrderWidNever;

  if (comMarks != null) {
    comMarkKeys.find(itTime => {
      if (checkIsArray(comMarks[itTime])) {
        if (lastSelector !== comMarks[itTime][0]) repeats = 1;
        else repeats++;

        lastSelector = comMarks[itTime][0];
      }

      return time === +itTime;
    });
  }

  const { ord } = com.getOrd(lastSelector);
  let title = makeCmComAudioMarkTitleEmptySelector(selector, comMarks, time, com.langi ?? 0);

  const repeatsText = `${repeats > 1 ? `${makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.Before, repeats)} ` : ''}`;
  const isReplaceBlockText = checkIsStartsWith(title, '+');
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
  cMarks: CmComAudioMarkPack[HttpNumLeadLink],
  ordw: CmComOrderWid,
) => {
  let repeats = 0;

  if (cMarks)
    objectKeys(cMarks).find(itTime => {
      if (checkIsArray(cMarks[itTime])) {
        if (ordw === cMarks[itTime][0]) repeats++;
        else repeats = 0;

        return time === +itTime;
      }
    });

  return repeats;
};
