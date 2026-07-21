import {
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComAudioMarkSelector,
  CmComLineiZero,
  HttpNumLeadLink,
} from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmBroadcastMonolineSlideLineSelectorId } from 'shared/model/cm/broadcast';
import { checkIsArray, checkIsNaN, checkIsNotNil, checkIsStartsWith, checkIsString } from 'shared/utils/checkIs';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectKeys } from 'shared/utils/object.utils';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { comBlockKindsConfig } from 'shared/values/cm/block-kinds/comBlockKinds.config';

/** @deprecated */
export const makeCmComAudioMarkLineiFromSelector = (selector: CmBroadcastMonolineSlideLineSelectorId) =>
  selector[1] || CmComLineiZero;

/** @deprecated */
export const checkIsCmComAudioMarkTitleIsLineSelector = (selector: CmComAudioMarkSelector | nil): selector is string =>
  checkIsString(selector) && checkIsStartsWith(selector, '~') && !checkIsNaN(+selector.slice(1));

export const makeCmComAudioMarkTitleEmptySelectorLazy = lazyInit(() => {
  const enterBlockKind = comBlockKindsConfig.find(it => it.key === CmComBlockKindKey.Enter);
  const finalBlockKind = comBlockKindsConfig.find(it => it.key === CmComBlockKindKey.Final);
  const playBlockKind = comBlockKindsConfig.find(it => it.key === CmComBlockKindKey.Play);

  return !enterBlockKind || !finalBlockKind || !playBlockKind
    ? (selector: string | nil) => selector || '---'
    : (
        selector: string | nil,
        cMarks: (number | `${number}`)[] | CmComAudioMarkPack[HttpNumLeadLink] | nil,
        time: CmComAudioMarkPackTime,
        language: number,
      ) => {
        if (selector) return selector;

        if (!time) return enterBlockKind.title[language];

        cMarks = checkIsNotNil(cMarks) ? (checkIsArray(cMarks) ? cMarks : objectKeys(cMarks)) : [];

        if (+cMarks.at(-1)! === time) return finalBlockKind.title[language];

        return playBlockKind.title[language];
      };
});

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
    title: makeCmComAudioMarkTitleEmptySelectorLazy()(selector, comMarks, time, com.langi),
  };
};
