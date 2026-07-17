import { mylib } from '#shared/lib/my-lib';
import { takeCmComAudioPlayerCurrentTime } from '$cm/ext';
import { CmComAudioMarkPackTime } from 'shared/api';

export const takeCmComTrackCurrentTimeMark = (
  timeMarks: number[],
  timePositions$: Record<'prev' | 'current' | 'next' | 'preprev', CmComAudioMarkPackTime> | nil,
  extraTime = 0,
) => {
  const pivotTime = takeCmComAudioPlayerCurrentTime() + (extraTime < 0 ? 0 : extraTime);
  const currentMarkTimei = mylib.binarySearch(timeMarks, (time, timei, compare) => {
    return time < pivotTime && (timeMarks[timei + 1] == null || timeMarks[timei + 1] > pivotTime)
      ? compare.eq
      : pivotTime - time;
  });

  if (currentMarkTimei < 0) return 0;
  if (timePositions$ == null) return currentMarkTimei;

  timePositions$.preprev = (timeMarks[currentMarkTimei - 2] ?? 0) as CmComAudioMarkPackTime;
  timePositions$.prev = (timeMarks[currentMarkTimei - 1] ?? 0) as CmComAudioMarkPackTime;
  timePositions$.current = (timeMarks[currentMarkTimei] ?? 0) as CmComAudioMarkPackTime;
  timePositions$.next = (timeMarks[currentMarkTimei + 1] ?? 0) as CmComAudioMarkPackTime;

  return currentMarkTimei;
};
