import { CmCat, CmCatTracker, CmCom } from '$cm/ext';
import { CmComIntensityLevel } from 'shared/api';

export const cmEditorCategoryTrackers: CmCatTracker = {
  full: { title: 'Полный', select: () => true },
  dict: { title: 'Сборник', select: (com: CmCom, cat: CmCat) => !!cat.dict?.[com.wid] },
  list: { title: 'Список', select: (com: CmCom, cat: CmCat) => cat.stackSet.has(com.wid) },
  'lang:ru': { title: 'Язык - Русский', select: (com: CmCom) => !com.langi },
  'lang:ua': { title: 'Язык - Украинский', select: (com: CmCom) => com.langi === 1 },
  'int:1': { title: 'Очень медленные', select: (com: CmCom) => com.top.d === CmComIntensityLevel.TooSlow },
  'int:2': { title: 'Медленные', select: (com: CmCom) => com.top.d === CmComIntensityLevel.Slow },
  'int:3': {
    title: 'Средней интенсивности',
    select: (com: CmCom) => com.top.d == null || com.top.d === CmComIntensityLevel.Medium,
  },
  'int:4': { title: 'Быстрые', select: (com: CmCom) => com.top.d === CmComIntensityLevel.Fast },
  'int:5': { title: 'Очень быстрые', select: (com: CmCom) => com.top.d === CmComIntensityLevel.TooFast },
};
