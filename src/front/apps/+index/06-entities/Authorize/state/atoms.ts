import { IndexErrorScope } from '$index/shared/model/Index.model';
import { atom, useAtom } from 'atomaric';

const errorsAtom = atom<Partial<Record<IndexErrorScope, string | null>>>({});

export const useIndexAuthorizeErrors = () => useAtom(errorsAtom);
