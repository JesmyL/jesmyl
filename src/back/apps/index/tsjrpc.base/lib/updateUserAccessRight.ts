import { smylib } from 'shared/utils';
import { updateCRUDAccesRightValue } from 'shared/utils/index/utils';
import { indexServerTsjrpcBase } from '..';
import { userAccessRightsFileStore } from '../../file-stores';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';

export const indexTSJRPCBaseUpdateUserAccessRight: typeof indexServerTsjrpcBase.updateUserAccessRight = async ({
  login,
  rule,
  scope,
  value,
  operation,
}) => {
  const rights = userAccessRightsFileStore.getValue();

  if (rights[login] == null) return { value: null };

  rights[login][scope] ??= {};
  rights[login][scope][rule] = updateCRUDAccesRightValue(rights[login][scope][rule] ?? 0, operation, value);

  rights[login].info ??= { fio: 'unknown', m: Date.now() };
  rights[login].info.m = Date.now();

  if (!rights[login][scope][rule]) delete rights[login][scope][rule];
  if (!smylib.keys(rights[login][scope]).length) delete rights[login][scope];

  userAccessRightsFileStore.saveValue();
  const { info, ...userRights } = rights[login];
  indexServerTsjrpcShareMethods.refreshAccessRights({ rights: userRights }, { login });

  return { value: rights };
};
