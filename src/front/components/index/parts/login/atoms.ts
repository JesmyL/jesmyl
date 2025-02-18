import { atom, useAtom } from 'front/08-shared/lib/atoms';
import { IndexErrorScope } from '../../Index.model';

const errorsAtom = atom<Partial<Record<IndexErrorScope, string | null>>>({});

export const useAuthErrors = () => useAtom(errorsAtom);
