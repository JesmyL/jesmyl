import { takeUserRoleTiny } from 'back/apps/index/tinies/userRoleTiny';
import { takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { LocalSokiAuth, SokiAuthLogin } from 'shared/api';
import { Bool } from 'shared/enums';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { checkIsNil, checkIsString } from 'shared/utils/checkIs';
import { accessRightsCRUDOperations, checkUserScopeAccessRight, CRUDOperation } from 'shared/utils/index/utils';
import WebSocket from 'ws';
import { sokiServer } from './soki/SokiServer';

export const throwIfNoUserScopeAccessRight = async <
  Scope extends keyof IndexAppAccessRightTitles,
  Rule extends keyof OmitOwn<IndexAppAccessRightTitles[Scope], 'info'>,
>(
  selector: SokiAuthLogin | LocalSokiAuth | WebSocket | nil,
  scope: Scope,
  rule: Rule,
  operation?: CRUDOperation | CRUDOperation[],
) => {
  do {
    if (checkIsNil(selector)) break;
    let login: SokiAuthLogin | nil;

    if (typeof selector === 'object' && 'login' in selector) {
      if (selector.login) login = selector.login;
    }

    if (checkIsString(selector)) {
      login = selector;

      const client = sokiServer.clientsByLogin.get(login)?.values().next().value;

      if (client == null) break;
    }

    if (selector instanceof WebSocket) {
      login = sokiServer.auths.get(selector)?.login;
    }

    if (checkIsNil(login)) break;

    const userInfo = await takeUserTiny(login);

    if (!userInfo) break;
    if (userInfo.r === 'TOP') return false;

    const roleInfo = userInfo.r ? await takeUserRoleTiny(userInfo.r) : null;

    if (checkUserScopeAccessRight(roleInfo?.r, userInfo.rights, scope, rule, operation)) return false;
  } while (Bool.False);

  throw 'Нет прав на это действие';
};

export const checkWhatOfUserScopeOperationAccessRight = async <
  Scope extends keyof IndexAppAccessRightTitles,
  Rule extends keyof OmitOwn<IndexAppAccessRightTitles[Scope], 'info'>,
>(
  selector: SokiAuthLogin | LocalSokiAuth | WebSocket | nil,
  scope: Scope,
  rule: Rule,
): Promise<Record<CRUDOperation, boolean>> => {
  const result = {} as Record<CRUDOperation, boolean>;

  for (const operationStr in accessRightsCRUDOperations) {
    const operation = operationStr as CRUDOperation;

    try {
      if (await throwIfNoUserScopeAccessRight(selector, scope, rule, operation)) throw '';
      result[operation] = true;
    } catch (_e) {
      result[operation] = false;
    }
  }

  return result;
};
