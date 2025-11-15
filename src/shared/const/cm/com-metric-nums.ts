import { CmComMetricNums } from 'shared/model/cm/com-metric-nums';

export const cmComNextMetricSize: Record<CmComMetricNums, CmComMetricNums> = {
  2: 3,
  3: 4,
  4: 6,
  6: 8,
  8: 2,
};

export const cmComMetricNumTitles: Record<CmComMetricNums, string> = {
  4: '4/4',
  2: '2/4',
  3: '3/4',
  6: '6/8',
  8: '8/8',
};
