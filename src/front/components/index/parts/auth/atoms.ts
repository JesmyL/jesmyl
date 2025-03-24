import { atom, useAtom } from '#shared/lib/atom';
import { IndexErrorScope } from '$index/Index.model';

const errorsAtom = atom<Partial<Record<IndexErrorScope, string | null>>>({});

export const useAuthErrors = () => useAtom(errorsAtom);
