import { CmComOrderEditableRegion } from '#shared/model/cm/order/regions';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { TextCase } from 'shared/model/common';
import { CmComOrdRepeatSlashPlacement, makeCmComOrderRepeats } from './order';
import { cmTransformToReadableLines } from './transformToReadableText';

export const cmComOrderMakeRepeatedText = <Ord extends CmComOrder>(
  text: string,
  regions: CmComOrderEditableRegion<Ord>[] | nil,
) => {
  if (!regions?.length) return text;

  const textSplits = cmTransformToReadableLines(text.split('\n'), TextCase.AsIs).lines.map(splitMap);

  if (regions.length > 1) regions.sort(finRateSort);

  regions.forEach(({ startLinei, startWordi, count }) => {
    if (startLinei != null && startWordi != null) {
      const word = textSplits[startLinei]?.[startWordi];
      if (word)
        textSplits[startLinei][startWordi] =
          `${makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.Before, count)}${word}`;
    }
  });

  if (regions.length > 1) regions.sort(startRateSort);

  regions.forEach(({ count, finLinei, finWordi }) => {
    if (finLinei != null && finWordi != null) {
      if (textSplits[finLinei]?.[finWordi])
        textSplits[finLinei][finWordi] += `${makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.After, count)}`;
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
