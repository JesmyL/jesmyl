import { translateDynamic } from '#basis/locale';
import {
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComAudioMarkSelector,
  CmComLineiZero,
  HttpNumLeadLink,
  Langi,
} from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmBroadcastMonolineSlideLineSelectorId } from 'shared/model/cm/broadcast';
import { checkIsArray, checkIsNaN, checkIsNotNil, checkIsStartsWith, checkIsString } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';

/** @deprecated */
export const makeCmComAudioMarkLineiFromSelector = (selector: CmBroadcastMonolineSlideLineSelectorId) =>
  selector[1] || CmComLineiZero;

/** @deprecated */
export const checkIsCmComAudioMarkTitleIsLineSelector = (selector: CmComAudioMarkSelector | nil): selector is string =>
  checkIsString(selector) && checkIsStartsWith(selector, '~') && !checkIsNaN(+selector.slice(1));

export const makeCmComAudioMarkTitleEmptySelector = (
  selector: string | nil,
  cMarks: (number | `${number}`)[] | CmComAudioMarkPack[HttpNumLeadLink] | nil,
  time: CmComAudioMarkPackTime,
  langi: Langi,
) => {
  if (selector) return selector;

  if (!time) return translateDynamic(langi)(it => it.cm.com.kind[CmComBlockKindKey.Enter]);

  cMarks = checkIsNotNil(cMarks) ? (checkIsArray(cMarks) ? cMarks : objectKeys(cMarks)) : [];

  if (+cMarks.at(-1)! === time) return translateDynamic(langi)(it => it.cm.com.kind[CmComBlockKindKey.Final]);

  return translateDynamic(langi)(it => it.cm.com.kind[CmComBlockKindKey.Play]);
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
    if (!ord) return { title: '??', ord: null, isShortTime };

    return {
      ord,
      isShortTime,
      title: `#${visibleOrdi + 1} ${ord.me.header()}`,
    };
  }

  return {
    isShortTime,
    title: makeCmComAudioMarkTitleEmptySelector(selector, comMarks, time, com.langi),
  };
};
