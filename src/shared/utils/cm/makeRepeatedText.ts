import { CmComOrder, CmComOrderEditableRegion } from '$cm/ext';
import { nbsp } from './com/const';

export const cmComOrderMakeRepeatedText = <Ord extends CmComOrder>(
  text: string,
  regions: CmComOrderEditableRegion<Ord>[] | nil,
) => {
  if (!regions?.length) return text;

  const textSplits = text.split('\n').map(splitMap);

  regions.sort(finRateSort);

  regions.forEach(({ startLinei, startWordi, count }) => {
    if (startLinei != null && startWordi != null) {
      const word = textSplits[startLinei]?.[startWordi];
      if (word) textSplits[startLinei][startWordi] = `${'/'.repeat(count)}${nbsp}${word}`;
    }
  });

  regions.sort(startRateSort);

  regions.forEach(({ count, finLinei, finWordi }) => {
    if (finLinei != null && finWordi != null) {
      if (textSplits[finLinei]?.[finWordi]) textSplits[finLinei][finWordi] += `${nbsp}${'\\'.repeat(count)}`;
    }
  });

  return textSplits.map(joinMap).join('\n');
};

const joinMap = (line: string[]) => line.join(' ');
const splitMap = (line: string) => line.split(' ');
const finRateSort = (a: { finRate: number }, b: { finRate: number }) => a.finRate - b.finRate;
const startRateSort = (a: { startRate: number }, b: { startRate: number }) => b.startRate - a.startRate;
