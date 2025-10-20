import { useAtomValue } from 'atomaric';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { checkUserScopeAccessRight, CRUDOperation } from 'shared/utils/index/utils';
import { indexUserAccessRightsAtom } from './atoms';

export const useCheckUserAccessRightsInScope = () => {
  const rights = useAtomValue(indexUserAccessRightsAtom);

  return <
    Scope extends keyof IndexAppAccessRightTitles,
    Rule extends keyof OmitOwn<IndexAppAccessRightTitles[Scope], 'info'>,
  >(
    scope: Scope,
    rule: Rule,
    operation?: CRUDOperation | CRUDOperation[],
  ) => checkUserScopeAccessRight(null, rights, scope, rule, operation);
};
