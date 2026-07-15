import { userExtDB } from 'back/drizzle.schema';
import { dbUpdate } from 'back/drizzle/drizzle.db';
import { upsertUser2ComProps } from 'back/drizzle/ex/user2Com.utils';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { eq } from 'drizzle-orm';
import { LocalSokiAuth } from 'shared/api';
import { CmUserStoreTsjrpcModel } from 'shared/api/tsjrpc/cm/user-store.tsjrpc.model';
import { checkIsNil } from 'shared/utils/checkIs';
import { WebSocket } from 'ws';
import { takeUserTiny } from '../index/tinies/userTiny';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmUserStoreTsjrpcBaseServer = new (class CmUserStore extends TsjrpcBaseServer<CmUserStoreTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmUserStore',
      methods: {
        comFav: async (args, tool) => {
          const auth = takeLogginedAuthOrThrow(tool.auth);

          const authLogin = auth.login;
          const user2ComResult = await upsertUser2ComProps(authLogin, args.comw, { isFav: args.is });
          if (!user2ComResult || checkIsNil(user2ComResult.userId)) throw 'Error 7817612365515263';

          cmShareServerTsjrpcMethods.comFav({ ...args, mod: user2ComResult.cmFavComMod }, makeFilter(tool));
        },

        favTools: async ({ tools }, tool) => {
          const auth = takeLogginedAuthOrThrow(tool.auth);
          const user = await takeUserTiny({ l: auth.login });

          const mod = Date.now();

          await dbUpdate(userExtDB, { cmFavComTools: tools, cmFavComToolsMod: mod }, eq(userExtDB.userId, user.id));

          cmShareServerTsjrpcMethods.favTools({ tools, mod }, makeFilter(tool));
        },
      },
    });
  }
})();

const makeFilter = (tool: ServerTSJRPCTool) => {
  const authLogin = takeLogginedAuthOrThrow(tool.auth).login;
  return (_: unknown, auth: LocalSokiAuth | nil, client: WebSocket) =>
    client !== tool.client && auth?.login === authLogin;
};
