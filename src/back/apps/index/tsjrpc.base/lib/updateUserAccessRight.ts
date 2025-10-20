import { smylib } from 'shared/utils';
import { switchCRUDAccesRightValue } from 'shared/utils/index/utils';
import { indexServerTsjrpcBase } from '..';
import { userAccessRightsAndRolesFileStore } from '../../file-stores';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { makeUserAccessRights } from './makeUserAccessRights';

export const indexTSJRPCBaseUpdateUserAccessRight: typeof indexServerTsjrpcBase.updateUserAccessRight = async ({
  login,
  rule,
  scope,
  operation,
}) => {
  if (scope === 'general') throw 'Эти права доступа менять нельзя';

  const { rights, roles } = userAccessRightsAndRolesFileStore.getValue();

  if (rights[login] == null) return { value: null };
  const userRights = rights[login];

  userRights[scope] ??= {};
  userRights[scope][rule] = switchCRUDAccesRightValue(userRights[scope][rule] ?? 0, operation);

  userRights.info ??= { fio: 'unknown 856278', m: 0 };
  userRights.info.m = Date.now();

  if (!userRights[scope][rule]) delete userRights[scope][rule];
  if (!smylib.keys(userRights[scope]).length) delete userRights[scope];

  userAccessRightsAndRolesFileStore.saveValue();

  indexServerTsjrpcShareMethods.refreshAccessRights({ rights: makeUserAccessRights(login) }, { login });

  return { value: { rights, roles } };
};
