import { MyLib, mylib } from '#shared/lib/my-lib';
import { CmComOrder, CmComOrderEditableRegion } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import { OrderRepeats } from 'shared/api';
import { itIt } from '../utils';

export const cmComOrderMakeRegions = <Ord extends CmComOrder>(
  self: Ord | null,
  text: string,
  repeats: OrderRepeats | nil,
  comOrders: CmComOrder[] | nil,
) => {
  const txt = (text || '').split(makeRegExp('/\\n+/')).map((txt: string) => txt.split(makeRegExp('/\\s+/')));
  const lines = txt.length;

  return repeats === 0
    ? []
    : MyLib.entries(mylib.isNum(repeats) ? { '.': repeats } : repeats).map(
        ([key, count]: [string, number]): CmComOrderEditableRegion<Ord> => {
          if (key === '.')
            return {
              startLinei: 0,
              startWordi: 0,
              endLinei: lines - 1,
              endWordi: (txt[txt.length - 1] || '').length - 1,
              isEndWordiLast: true,
              startOrd: self,
              endOrd: self,
              others: null,
              key,
              startKey: key,
              endKey: key,
              count,
            };
          else if (key.startsWith('~')) {
            const [, linei, wordi] = key.split(makeRegExp('/[~:]/'));

            return {
              startLinei: +linei,
              startWordi: +wordi,
              endLinei: null,
              endWordi: null,
              isEndWordiLast: false,
              startOrd: self,
              endOrd: self,
              others: null,
              key,
              startKey: key,
              endKey: key,
              count,
            };
          } else {
            const letter: string | undefined = (makeRegExp('/[a-z]/i').exec(key) ?? [])[0];

            if (letter !== undefined) {
              const [first, second, third] = key.split(makeRegExp('/[:a-z]/i')).map(num => parseInt(num));
              const isBeg = key.match(makeRegExp('/^[a-z]/i'));
              let others: number[] = [];
              let finishKey: string = '';

              const ord = comOrders?.find(
                (ord: CmComOrder) =>
                  !mylib.isNum(ord.repeats) &&
                  Object.keys(ord.repeats || {}).some(key => {
                    if (key[!isBeg ? 'startsWith' : 'endsWith'](letter)) {
                      others = key.split(makeRegExp('/[:a-z]/i')).filter(itIt).map(Number);
                      finishKey = key;
                      return true;
                    }
                    return false;
                  }),
              );

              return (
                isBeg
                  ? {
                      startLinei: second,
                      startWordi: third,
                      endLinei: null,
                      endWordi: null,
                      startOrd: self,
                      endOrd: ord,
                      others,
                      key,
                      startKey: key,
                      endKey: finishKey,
                      count,
                    }
                  : {
                      startLinei: null,
                      startWordi: null,
                      endLinei: first,
                      endWordi: second,
                      startOrd: ord,
                      endOrd: self,
                      others,
                      key,
                      startKey: key,
                      endKey: finishKey,
                      count,
                    }
              ) as CmComOrderEditableRegion<Ord>;
            } else {
              const [beg, end] = key.split('-');
              const [startLinei, startWordi = 0] = beg.split(':').map(num => parseInt(num));
              let endLinei = 0;
              let endWordi = 0;
              let isEndWordiLast = false;

              if (end) {
                [endLinei, endWordi] = (end || '').split(':').map(num => parseInt(num));
                if (mylib.isNaN(endLinei)) endLinei = startLinei;
                if (endWordi == null) {
                  endWordi = (txt[endLinei] || '').length - 1;
                  isEndWordiLast = true;
                }
              } else [endLinei, endWordi] = [startLinei, (txt[startLinei] || '').length - 1];

              return {
                startLinei,
                startWordi,
                endLinei,
                endWordi,
                isEndWordiLast,
                startOrd: self,
                endOrd: self,
                others: null,
                key,
                startKey: key,
                endKey: key,
                count,
              };
            }
          }
        },
      );
};
