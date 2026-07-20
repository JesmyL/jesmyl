import {
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComAudioMarkSelector,
  CmComLangi,
  CmComLineiZero,
  CmComOrderWid,
  HttpNumLeadLink,
} from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmBroadcastMonolineSlideLineSelectorId } from 'shared/model/cm/broadcast';
import { checkIsArray, checkIsNaN, checkIsStartsWith, checkIsString } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { comBlockKindsConfig } from 'shared/values/cm/block-kinds/comBlockKinds.config';

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

export const makeCmComAudioMarkTitleBySelector = (
  time: CmComAudioMarkPackTime,
  com: CmCom,
  selector: CmComAudioMarkSelector | nil,
  comMarks: CmComAudioMarkPack[HttpNumLeadLink] | nil,
) => {
  const comMarkKeys = objectKeys(comMarks);
  const isShortTime = Math.abs(time - +(comMarkKeys[comMarkKeys.indexOf(`${time}`) + 1] ?? 0)) < 1;

  if (checkIsArray(selector)) {
    const { ord, visibleOrdi } = com.getOrd(selector[0]);
    if (!comMarks || !ord) return { title: '??', ord: null, isShortTime };

    const repeats = computeOrdRepeats(time, comMarks, selector[0]);

    return {
      ord,
      isShortTime,
      title: `#${visibleOrdi + 1} ${ord.me.header()}${Math.trunc(selector[0]) === selector[0] ? '' : '+'}${repeats > 1 ? ` ×${repeats}` : ''}`,
    };
  }

  return {
    isShortTime,
    title: makeCmComAudioMarkTitleEmptySelector(selector, comMarks, time, CmComLangi.Ru),
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
