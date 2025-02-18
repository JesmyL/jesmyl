import { atom } from 'front/08-shared/lib/atoms';
import { CmCatWid } from 'shared/api';

export const removedCategoriesAtom = atom({} as Record<CmCatWid, string>);
