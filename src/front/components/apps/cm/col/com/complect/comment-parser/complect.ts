import { atom } from 'atomaric';
import { CmComOrderWid } from 'shared/api';

export const comCommentRedactOrdwAtom = atom<CmComOrderWid | 'head' | null>(null);
