import { CmCat, CmCatTracker, CmCom } from '$cm/ext';

export const cmEditorCategoryTrackers: CmCatTracker[] = [
  { title: 'Полный', id: 'full', select: () => true },
  { title: 'Сборник', id: 'dict', select: (com: CmCom, cat: CmCat) => !!cat.dict?.[com.wid] },
  { title: 'Список', id: 'list', select: (com: CmCom, cat: CmCat) => cat.stack?.includes(com.wid) },
  { title: 'Язык - Русский', id: 'lang:ru', select: (com: CmCom) => !com.langi },
  { title: 'Язык - Украинский', id: 'lang:ua', select: (com: CmCom) => com.langi === 1 },
];
