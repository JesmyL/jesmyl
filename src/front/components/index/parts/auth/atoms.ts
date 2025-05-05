import { IndexErrorScope } from '$index/Index.model';
import { atom, useAtom } from 'atomaric';

const errorsAtom = atom<Partial<Record<IndexErrorScope, string | null>>>({});

export const useAuthErrors = () => useAtom(errorsAtom);
