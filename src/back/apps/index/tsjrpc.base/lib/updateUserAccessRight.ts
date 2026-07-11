import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { userDB } from 'back/drizzle.schema';
import { dbUpdate } from 'back/drizzle/drizzle.db';
import { eq } from 'drizzle-orm';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { switchCRUDAccesRightValue } from 'shared/utils/index/utils';
import { objectLength } from 'shared/utils/object.utils';
import { resetUserTiny, takeUserTiny } from '../../tinies/userTiny';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { makeUserAccessRights } from './makeUserAccessRights';

export const indexTSJRPCBaseUpdateUserAccessRight = {
  updateUserAccessRight: async ({ login, rule, scope, operation }) => {
    if (scope === 'general') throw 'Эти права доступа менять нельзя';

    const { rights: userRights } = (await takeUserTiny(login)) ?? {};

    if (!userRights) return { value: {} };

    userRights[scope] ??= {};
    userRights[scope][rule] = switchCRUDAccesRightValue(userRights[scope][rule] ?? 0, operation);

    if (!userRights[scope][rule]) delete userRights[scope][rule];
    if (!objectLength(userRights[scope])) delete userRights[scope];

    const m = Date.now();

    await dbUpdate(userDB, { rights: userRights, m }, eq(userDB.l, login));
    resetUserTiny(login);

    indexServerTsjrpcShareMethods.refreshAccessRights({ rights: await makeUserAccessRights(login), mod: m }, { login });

    return { value: { [login]: await takeUserTiny(login) } };
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
