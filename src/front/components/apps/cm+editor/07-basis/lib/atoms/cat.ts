import { atom } from 'atomaric';
import { CmCatWid } from 'shared/api';

export const removedCategoriesAtom = atom({} as Record<CmCatWid, string>);
