import { userAccessRightsFileStore } from 'back/apps/index/file-stores';
import { SokiAuthLogin } from 'shared/api';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { sokiServer } from './soki/SokiServer';

export const throwIfNoUserScopeAccessRight = <
  Scope extends keyof IndexAppAccessRightTitles,
  Rule extends keyof OmitOwn<IndexAppAccessRightTitles[Scope], 'info'>,
>(
  login: SokiAuthLogin | nil,
  scope: Scope,
  rule: Rule,
  operation?: Parameters<typeof checkUserScopeAccessRight>[3],
): login is nil => {
  do {
    if (login == null) break;
    const client = sokiServer.clientsByLogin.get(login)?.values().next().value;
    if (client == null) break;
    if (sokiServer.auths.get(client)?.level === 100) return false;

    const userScope = userAccessRightsFileStore.getValue()[login];

    if (userScope == null) break;
    if (checkUserScopeAccessRight(userScope, scope, rule, operation)) return false;

    // eslint-disable-next-line no-constant-condition
  } while (false);

  throw 'Нет прав на это действие';
};
