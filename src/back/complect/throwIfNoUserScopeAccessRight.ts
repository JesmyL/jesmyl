import { userAccessRightsAndRolesFileStore } from 'back/apps/index/file-stores';
import { LocalSokiAuth, SokiAuthLogin } from 'shared/api';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { smylib } from 'shared/utils';
import { checkUserScopeAccessRight, CRUDOperation } from 'shared/utils/index/utils';
import WebSocket from 'ws';
import { sokiServer } from './soki/SokiServer';

export const throwIfNoUserScopeAccessRight = <
  Scope extends keyof IndexAppAccessRightTitles,
  Rule extends keyof OmitOwn<IndexAppAccessRightTitles[Scope], 'info'>,
>(
  selector: SokiAuthLogin | LocalSokiAuth | WebSocket | nil,
  scope: Scope,
  rule: Rule,
  operation?: CRUDOperation | CRUDOperation[],
): selector is nil => {
  do {
    if (selector == null) break;
    let login: SokiAuthLogin | nil;

    if (typeof selector === 'object' && 'level' in selector) {
      if (selector?.level === 100) return false;
      if (selector.login) login = selector.login;
    }

    if (smylib.isStr(selector)) {
      login = selector;

      const client = sokiServer.clientsByLogin.get(login)?.values().next().value;

      if (client == null) break;
      if (sokiServer.auths.get(client)?.level === 100) return false;
    }

    if (selector instanceof WebSocket) {
      if (sokiServer.auths.get(selector)?.level === 100) return false;

      login = sokiServer.auths.get(selector)?.login;
    }

    if (login == null) break;

    const userRights = userAccessRightsAndRolesFileStore.getValue().rights[login];

    if (userRights == null) break;
    const roleRights = userRights.info.role
      ? userAccessRightsAndRolesFileStore.getValue().roles[userRights.info.role]
      : null;

    if (checkUserScopeAccessRight(roleRights, userRights, scope, rule, operation)) return false;

    // eslint-disable-next-line no-constant-condition
  } while (false);

  throw 'Нет прав на это действие';
};
