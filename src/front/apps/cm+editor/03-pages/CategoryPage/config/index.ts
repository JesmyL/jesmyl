import { CmCat, CmCatTracker, CmCom } from '$cm/ext';
import { CmComIntensityLevel } from 'shared/api';

export const cmEditorCategoryTrackers: CmCatTracker[] = [
  { title: 'Полный', id: 'full', select: () => true },
  { title: 'Сборник', id: 'dict', select: (com: CmCom, cat: CmCat) => !!cat.dict?.[com.wid] },
  { title: 'Список', id: 'list', select: (com: CmCom, cat: CmCat) => cat.stack?.includes(com.wid) },
  { title: 'Язык - Русский', id: 'lang:ru', select: (com: CmCom) => !com.langi },
  { title: 'Язык - Украинский', id: 'lang:ua', select: (com: CmCom) => com.langi === 1 },
  { title: 'Очень медленные', id: 'int:1', select: (com: CmCom) => com.top.d === CmComIntensityLevel.TooSlow },
  { title: 'Медленные', id: 'int:2', select: (com: CmCom) => com.top.d === CmComIntensityLevel.Slow },
  {
    title: 'Средней интенсивности',
    id: 'int:3',
    select: (com: CmCom) => com.top.d == null || com.top.d === CmComIntensityLevel.Medium,
  },
  { title: 'Быстрые', id: 'int:4', select: (com: CmCom) => com.top.d === CmComIntensityLevel.Fast },
  { title: 'Очень быстрые', id: 'int:5', select: (com: CmCom) => com.top.d === CmComIntensityLevel.TooFast },
];
