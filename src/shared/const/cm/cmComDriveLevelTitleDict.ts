import { CmComIntensityLevel } from 'shared/api';

export const cmComIntensityLevelTitleDict: Record<CmComIntensityLevel, string> = {
  [CmComIntensityLevel.TooFast]: 'Очень быстрая',
  [CmComIntensityLevel.Fast]: 'Быстрая',
  [CmComIntensityLevel.Medium]: 'Средняя',
  [CmComIntensityLevel.Slow]: 'Медленная',
  [CmComIntensityLevel.TooSlow]: 'Очень медленная',
};
