import { mylib } from '#shared/lib/my-lib';
import { takeCmComAudioPlayerCurrentTime } from '$cm/ext';
import { checkIsNil } from 'shared/utils/checkIs';

export const takeCmComTrackCurrentTimeMark = (timeMarks: number[]) => {
  const pivotTime = takeCmComAudioPlayerCurrentTime();

  return Math.max(
    0,
    mylib.binarySearch(timeMarks, (time, timei, compare) => {
      return time < pivotTime && (checkIsNil(timeMarks[timei + 1]) || timeMarks[timei + 1] > pivotTime)
        ? compare.eq
        : pivotTime - time;
    }),
  );
};
