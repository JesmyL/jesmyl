import { atom, useAtom } from 'atomaric';
import { IndexErrorScope } from 'shared/model/index/Index.model';

const errorsAtom = atom<Partial<Record<IndexErrorScope, string | null>>>({});

export const useIndexAuthorizeErrors = () => useAtom(errorsAtom);
