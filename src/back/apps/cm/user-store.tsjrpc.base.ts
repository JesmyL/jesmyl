import { userExtDB } from 'back/drizzle.schema';
import { dbUpdate } from 'back/drizzle/drizzle.db';
import { upsertUser2ComProps } from 'back/drizzle/ex/user2Com.utils';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { eq } from 'drizzle-orm';
import { LocalSokiAuth, SokiVisit } from 'shared/api';
import { CmUserStoreTsjrpcModel } from 'shared/api/tsjrpc/cm/user-store.tsjrpc.model';
import { extractNumber } from 'shared/utils';
import { checkIsNil } from 'shared/utils/checkIs';
import { mapObjectEntries } from 'shared/utils/object.utils';
import { WebSocket } from 'ws';
import { takeUserTiny } from '../index/tinies/userTiny';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmUserStoreTsjrpcBaseServer = new (class CmUserStore extends TsjrpcBaseServer<CmUserStoreTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmUserStore',
      methods: {
        comFav_v1: async ({ fav }, tool) => {
          const auth = takeLogginedAuthOrThrow(tool.auth);
          let mod = 0;

          const authLogin = auth.login;
          await Promise.all(
            mapObjectEntries(fav, async (comw, is) => {
              const user2ComResult = await upsertUser2ComProps(authLogin, extractNumber(comw), { isFav: !!is });
              if (!user2ComResult || checkIsNil(user2ComResult.cmFavComMod)) throw 'Error 7817612365515263';

              mod = Math.max(user2ComResult.cmFavComMod, mod);
            }),
          );

          cmShareServerTsjrpcMethods.comFav_v1({ fav, mod }, makeFilter(tool, 1233));
        },

        favTools_v1: async ({ tools }, tool) => {
          const auth = takeLogginedAuthOrThrow(tool.auth);
          const user = await takeUserTiny({ l: auth.login });

          const mod = Date.now();

          await dbUpdate(userExtDB, { cmComTools: tools, cmFavComToolsMod: mod }, eq(userExtDB.userId, user.id));

          cmShareServerTsjrpcMethods.favTools_v1({ tools, mod }, makeFilter(tool));
        },
      },
    });
  }
})();

const makeFilter = (tool: ServerTSJRPCTool, minAccessVersion?: number) => {
  const authLogin = takeLogginedAuthOrThrow(tool.auth).login;

  const checkVersion = minAccessVersion ? (version: number) => version >= minAccessVersion : () => true;

  return (visit: SokiVisit | nil, auth: LocalSokiAuth | nil, client: WebSocket) =>
    client !== tool.client && auth?.login === authLogin && !!visit && checkVersion(visit.version);
};
