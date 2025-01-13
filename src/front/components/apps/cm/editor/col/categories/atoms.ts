import { atom } from 'front/complect/atoms';
import { CmCatWid } from 'shared/api';

export const removedCategoriesAtom = atom({} as Record<CmCatWid, string>);
