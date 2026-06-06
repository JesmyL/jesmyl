import { CmComOrderEditableRegion, CmComOrderEditableRegionBase } from '#shared/model/cm/order/regions';
import { makeRegExp } from 'regexpert';
import { OrderRepeats, SpecialOrderRepeatsKey } from 'shared/api';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { checkIsNumber } from '../checkIs';
import { objectEntries, objectKeys } from '../object.utils';
import {
  cmComOrderCheckRepeatKeyIsFlag,
  cmComOrderCheckRepeatKeyIsPortalStart,
  cmComOrderCheckRepeatKeyPortalLetterIsOtherSide,
  cmComOrderTakeRepeatInnerKeyComponents,
  makeCmComOrderRepeatOrSelf,
  takeCmComOrderRepeatPortalKeyLetter,
} from './repeat-keys';

export const cmComOrderMakeRegions = <Ord extends CmComOrder>(
  self: Ord | null,
  text: string,
  repeats: OrderRepeats | nil,
  comOrders: Ord[] | nil,
) => {
  const lineWordsList = (text || '').split(makeRegExp('/\\n+/')).map((txt: string) => txt.split(makeRegExp('/\\s+/')));
  const lines = lineWordsList.length;

  return repeats === 0
    ? []
    : objectEntries(makeCmComOrderRepeatOrSelf(repeats)).map(([key, count]): CmComOrderEditableRegion<Ord> => {
        if (key === SpecialOrderRepeatsKey.Self)
          return calculateRate({
            startLinei: 0,
            startWordi: 0,
            finLinei: lines - 1,
            finWordi: (lineWordsList[lineWordsList.length - 1] || '').length - 1,
            isFinWordiLast: true,
            startOrd: self,
            finOrd: self,
            others: null,
            key,
            startKey: key,
            finKey: key,
            count,
          });
        else if (cmComOrderCheckRepeatKeyIsFlag(key)) {
          const [, linei, wordi] = key.split(makeRegExp('/[~:]/'));

          return calculateRate({
            startLinei: +linei,
            startWordi: +wordi,
            finLinei: null,
            finWordi: null,
            startOrd: self,
            finOrd: self,
            others: null,
            key,
            startKey: key,
            finKey: key,
            count,
          });
        } else {
          const letter = takeCmComOrderRepeatPortalKeyLetter(key);

          if (letter != null) {
            const isStart = cmComOrderCheckRepeatKeyIsPortalStart(key);
            const [lineiStr, wordiStr] = key.slice(isStart ? 1 : 0, isStart ? undefined : -1).split(':');

            let others: [linei: number, wordi: number] | nil = null;
            let finishKey: SpecialOrderRepeatsKey | nil = null;

            const ord = comOrders?.find(
              (ord: CmComOrder) =>
                !checkIsNumber(ord.repeats) &&
                objectKeys(ord.repeats).some(key => {
                  if (cmComOrderCheckRepeatKeyPortalLetterIsOtherSide(key, letter, isStart)) {
                    const isStart = cmComOrderCheckRepeatKeyIsPortalStart(key);
                    others = key
                      .slice(isStart ? 1 : 0, isStart ? undefined : -1)
                      .split(':')
                      .map(Number) as [number, number];
                    finishKey = key;
                    return true;
                  }
                  return false;
                }),
            );

            return calculateRate(
              isStart
                ? {
                    startLinei: +lineiStr,
                    startWordi: +wordiStr,
                    finLinei: null,
                    finWordi: null,
                    startOrd: self,
                    finOrd: ord,
                    others,
                    key,
                    startKey: key,
                    finKey: finishKey,
                    count,
                  }
                : {
                    startLinei: null,
                    startWordi: null,
                    finLinei: +lineiStr,
                    finWordi: +wordiStr,
                    startOrd: ord,
                    finOrd: self,
                    others,
                    key,
                    startKey: key,
                    finKey: finishKey,
                    count,
                  },
            ) satisfies CmComOrderEditableRegion<Ord>;
          } else {
            return calculateRate({
              ...cmComOrderTakeRepeatInnerKeyComponents(key, lineWordsList),
              startOrd: self,
              finOrd: self,
              others: null,
              key,
              startKey: key,
              finKey: key,
              count,
            });
          }
        }
      });
};

const calculateRate = <Ord extends CmComOrder, Rep extends CmComOrderEditableRegionBase<Ord>>(it: Rep) => ({
  ...it,
  startRate: calc(it.startOrd?.i, it.startLinei, it.startWordi),
  finRate: calc(it.finOrd?.i, it.finLinei, it.finWordi),
  otherRate: it.others ? calc((it.finOrd ?? it.startOrd)?.i, it.others[0], it.others[1]) : 0,
});

const calc = (ordi: number | nil, linei: number | nil, wordi: number | nil) =>
  ((ordi ?? 0) + 1) * 100 + ((linei ?? 0) + 1) * 10 + (wordi ?? 0) + 1;
