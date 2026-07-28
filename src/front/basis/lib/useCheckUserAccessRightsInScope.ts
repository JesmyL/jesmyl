import { indexUserAccessRightsAtom } from '$index/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { howMillisecondsInDay } from 'shared/const/ms';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { checkUserScopeAccessRight, CRUDOperation } from 'shared/utils/index/utils';

export const useCheckUserAccessRightsInScope = () => {
  const rights = useAtomValue(indexUserAccessRightsAtom);

  return <
    Scope extends keyof IndexAppAccessRightTitles,
    Rule extends keyof OmitOwn<IndexAppAccessRightTitles[Scope], 'info'>,
  >(
    scope: Scope,
    rule: Rule,
    operation?: CRUDOperation | CRUDOperation[],
    /** one day access */
    createdAt?: number,
  ) => {
    if (createdAt && createdAt > Date.now() - howMillisecondsInDay) return true;

    return checkUserScopeAccessRight(null, rights, scope, rule, operation);
  };
};
