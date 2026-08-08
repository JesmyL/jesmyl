import { CmCatTracker } from '#shared/model/cm/cat/Cat.model';
import { CmComIntensityLevel, Langi } from 'shared/api';

export const cmEditorCategoryTrackers: CmCatTracker = {
  full: () => true,
  dict: (com, cat) => !!cat.dict?.[com.w],
  list: (com, cat) => cat.stackSet.has(com.w),

  'lang:ru': com => com.l === Langi.Ru,
  'lang:ua': com => com.l === Langi.Ua,
  'lang:kz': com => com.l === Langi.Kz,

  'int:1': com => com.d === CmComIntensityLevel.TooSlow,
  'int:2': com => com.d === CmComIntensityLevel.Slow,
  'int:3': com => com.d == null || com.d === CmComIntensityLevel.Medium,
  'int:4': com => com.d === CmComIntensityLevel.Fast,
  'int:5': com => com.d === CmComIntensityLevel.TooFast,
};
