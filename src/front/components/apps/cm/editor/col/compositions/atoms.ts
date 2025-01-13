import { atom } from 'front/complect/atoms';
import { CmComWid } from 'shared/api';

export const removedCompositionsAtom = atom({} as Record<CmComWid, string>);
