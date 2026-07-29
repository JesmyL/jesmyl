import { CmCatTracker } from '#shared/model/cm/cat/Cat.model';
import { CmComIntensityLevel, Langi } from 'shared/api';

export const cmEditorCategoryTrackers: CmCatTracker = {
  full: () => true,
  dict: (com, cat) => !!cat.dict?.[com.wid],
  list: (com, cat) => cat.stackSet.has(com.wid),

  'lang:ru': com => com.langi === Langi.Ru,
  'lang:ua': com => com.langi === Langi.Ua,
  'lang:kz': com => com.langi === Langi.Kz,

  'int:1': com => com.top.d === CmComIntensityLevel.TooSlow,
  'int:2': com => com.top.d === CmComIntensityLevel.Slow,
  'int:3': com => com.top.d == null || com.top.d === CmComIntensityLevel.Medium,
  'int:4': com => com.top.d === CmComIntensityLevel.Fast,
  'int:5': com => com.top.d === CmComIntensityLevel.TooFast,
};
