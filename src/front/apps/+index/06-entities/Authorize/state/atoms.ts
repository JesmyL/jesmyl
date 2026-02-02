import { Atom, atom, useAtom } from 'atomaric';
import { IndexErrorScope } from 'shared/model/index/Index.model';

let errorsAtom: Atom<Partial<Record<IndexErrorScope, string | null>>>;

export const useIndexAuthorizeErrors = () => useAtom((errorsAtom ??= atom({})));
