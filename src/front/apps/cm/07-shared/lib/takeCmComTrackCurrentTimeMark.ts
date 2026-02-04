import { mylib } from '#shared/lib/my-lib';
import { takeCmComAudioPlayerCurrentTime } from '$cm/ext';

export const takeCmComTrackCurrentTimeMark = (
  timeMarks: number[],
  timePositions$: Record<'prev' | 'current' | 'next' | 'preprev', number> | nil,
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

  timePositions$.preprev = timeMarks[currentMarkTimei - 2] ?? 0;
  timePositions$.prev = timeMarks[currentMarkTimei - 1] ?? 0;
  timePositions$.current = timeMarks[currentMarkTimei] ?? 0;
  timePositions$.next = timeMarks[currentMarkTimei + 1] ?? 0;

  return currentMarkTimei;
};
