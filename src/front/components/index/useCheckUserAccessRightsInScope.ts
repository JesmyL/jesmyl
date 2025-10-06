import { useAtomValue } from 'atomaric';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { indexUserAccessRightsAtom, useAuth } from './atoms';

export const useCheckUserAccessRightsInScope = () => {
  const rights = useAtomValue(indexUserAccessRightsAtom);
  const auth = useAuth();

  if (auth.level === 100) return () => true;

  return <
    Scope extends keyof IndexAppAccessRightTitles,
    Rule extends keyof OmitOwn<IndexAppAccessRightTitles[Scope], 'info'>,
  >(
    scope: Scope,
    rule: Rule,
    operation?: Parameters<typeof checkUserScopeAccessRight>[3],
  ) => checkUserScopeAccessRight(rights as never, scope, rule, operation);
};
