import { atom } from 'front/complect/atoms';
import { CmComWidStr } from 'shared/api';

export const removedCompositionsAtom = atom({} as Record<CmComWidStr, string>);
