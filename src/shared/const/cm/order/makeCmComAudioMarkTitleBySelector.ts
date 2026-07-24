import { CmComAudioMarkPack, CmComAudioMarkPackTime, CmComAudioMarkSelector, HttpNumLeadLink, Langi } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { checkIsArray, checkIsNotNil } from 'shared/utils/checkIs';
import { translateBaseDefine } from 'shared/utils/locale/translate';
import { objectKeys } from 'shared/utils/object.utils';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { CmComOrders } from '../Com/parents/20-Orders';

const takeTitle = (langi: Langi, key: CmComBlockKindKey) =>
  translateBaseDefine(CmComOrders.getLangLocales(langi))(it => it.cm.com.kind[key]);

export const makeCmComAudioMarkTitleEmptySelector = (
  selector: string | nil,
  cMarks: (number | `${number}`)[] | CmComAudioMarkPack[HttpNumLeadLink] | nil,
  time: CmComAudioMarkPackTime,
  langi: Langi,
) => {
  if (selector) return selector;

  if (!time) return takeTitle(langi, CmComBlockKindKey.Enter);

  cMarks = checkIsNotNil(cMarks) ? (checkIsArray(cMarks) ? cMarks : objectKeys(cMarks)) : [];

  if (+cMarks.at(-1)! === time) return takeTitle(langi, CmComBlockKindKey.Final);

  return takeTitle(langi, CmComBlockKindKey.Play);
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
