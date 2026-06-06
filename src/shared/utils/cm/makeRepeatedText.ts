import { CmComOrderEditableRegion } from '#shared/model/cm/order/regions';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { nbsp } from './com/const';

export const cmComOrderMakeRepeatedText = <Ord extends CmComOrder>(
  text: string,
  regions: CmComOrderEditableRegion<Ord>[] | nil,
) => {
  if (!regions?.length) return text;

  const textSplits = text.split('\n').map(splitMap);

  if (regions.length > 1) regions.sort(finRateSort);

  regions.forEach(({ startLinei, startWordi, count }) => {
    if (startLinei != null && startWordi != null) {
      const word = textSplits[startLinei]?.[startWordi];
      if (word) textSplits[startLinei][startWordi] = `${'/'.repeat(count)}${nbsp}${word}`;
    }
  });

  if (regions.length > 1) regions.sort(startRateSort);

  regions.forEach(({ count, finLinei, finWordi }) => {
    if (finLinei != null && finWordi != null) {
      if (textSplits[finLinei]?.[finWordi]) textSplits[finLinei][finWordi] += `${nbsp}${'\\'.repeat(count)}`;
    }
  });

  return textSplits.map(joinMap).join('\n');
};

const joinMap = (line: string[]) => line.join(' ');
const splitMap = (line: string) => line.split(' ');
const finRateSort = <Ord extends CmComOrder>(a: CmComOrderEditableRegion<Ord>, b: CmComOrderEditableRegion<Ord>) =>
  a.finRate - b.finRate || a.otherRate - b.otherRate;

const startRateSort = <Ord extends CmComOrder>(a: CmComOrderEditableRegion<Ord>, b: CmComOrderEditableRegion<Ord>) =>
  b.startRate - a.startRate || b.otherRate - a.otherRate;
