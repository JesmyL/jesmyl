import { SokiServerClientSelector } from 'back/complect/soki/model';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { SokiAuthLogin } from 'shared/api';
import { CmUserStoreTsjrpcModel } from 'shared/api/tsjrpc/cm/user-store.tsjrpc.model';
import { aboutComFavoritesFileStore } from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

const valueSendBuilder = <Args extends object>(
  action: (
    authLogin: SokiAuthLogin,
    clientSelector: SokiServerClientSelector,
    args: Args,
  ) => void | ((tool: ServerTSJRPCTool) => void),
) => {
  return async (args: Args, tool: ServerTSJRPCTool) => {
    if (tool.auth?.login == null) throw 'Не авторизован для отправки user-store';
    const login = tool.auth.login;

    const ret = action(login, (_, auth) => auth?.login === login, args);
    if (ret === undefined) return;
    ret(tool);
  };
};

export const cmUserStoreTsjrpcBaseServer = new (class CmUserStore extends TsjrpcBaseServer<CmUserStoreTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmUserStore',
      methods: {
        setAboutComFavorites: valueSendBuilder((authLogin, clientSelector, userFavorites) => {
          const favorites = aboutComFavoritesFileStore.getValueWithAutoSave();

          const modifiedAt = Date.now();
          favorites[authLogin] ??= { m: modifiedAt };
          favorites[authLogin].m = modifiedAt;
          if (userFavorites.comws != null) favorites[authLogin].comws = userFavorites.comws;
          if (userFavorites.tools != null) favorites[authLogin].tools = userFavorites.tools;

          cmShareServerTsjrpcMethods.refreshAboutComFavorites({ value: favorites[authLogin] }, clientSelector);
        }),
      },
    });
  }
})();
