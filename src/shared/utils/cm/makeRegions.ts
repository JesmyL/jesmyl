import { CmComOrder, CmComOrderEditableRegion } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import { OrderRepeats, SpecialOrderRepeatsKey } from 'shared/api';
import { checkIsNumber } from '../checkIs';
import { objectEntries, objectKeys } from '../object.utils';
import { itIt } from '../utils';
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
          return {
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
          };
        else if (cmComOrderCheckRepeatKeyIsFlag(key)) {
          const [, linei, wordi] = key.split(makeRegExp('/[~:]/'));

          return {
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
          };
        } else {
          const letter = takeCmComOrderRepeatPortalKeyLetter(key);

          if (letter != null) {
            const [first, second, third] = key.split(makeRegExp('/[:a-z]/i')).map(Number);
            const isStart = cmComOrderCheckRepeatKeyIsPortalStart(key);
            let others: number[] = [];
            let finishKey: SpecialOrderRepeatsKey | nil = null;

            const ord = comOrders?.find(
              (ord: CmComOrder) =>
                !checkIsNumber(ord.repeats) &&
                objectKeys(ord.repeats).some(key => {
                  if (cmComOrderCheckRepeatKeyPortalLetterIsOtherSide(key, letter, isStart)) {
                    others = key.split(makeRegExp('/[:a-z]/i')).filter(itIt).map(Number);
                    finishKey = key;
                    return true;
                  }
                  return false;
                }),
            );

            return (
              isStart
                ? {
                    startLinei: second,
                    startWordi: third,
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
                    finLinei: first,
                    finWordi: second,
                    startOrd: ord,
                    finOrd: self,
                    others,
                    key,
                    startKey: key,
                    finKey: finishKey,
                    count,
                  }
            ) satisfies CmComOrderEditableRegion<Ord>;
          } else {
            return {
              ...cmComOrderTakeRepeatInnerKeyComponents(key, lineWordsList),
              startOrd: self,
              finOrd: self,
              others: null,
              key,
              startKey: key,
              finKey: key,
              count,
            };
          }
        }
      });
};
