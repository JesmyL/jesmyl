import { atom } from '#shared/lib/atom';
import { CmCatWid } from 'shared/api';

export const removedCategoriesAtom = atom({} as Record<CmCatWid, string>);
