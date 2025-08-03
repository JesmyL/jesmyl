import { SokiServerClientSelector } from 'back/complect/soki/model';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { SokiAuthLogin } from 'shared/api';
import { CmUserStoreTsjrpcModel } from 'shared/api/tsjrpc/cm/user-store.tsjrpc.model';
import { aboutComFavoritesFileStore, comCommentsFileStore } from './file-stores';
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

    const ret = action(login, (_client, auth) => auth?.login === login, args);
    if (ret === undefined) return;
    ret(tool);
  };
};

export const cmUserStoreTsjrpcBaseServer = new (class CmUserStore extends TsjrpcBaseServer<CmUserStoreTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmUserStore',
      methods: {
        setComComment: valueSendBuilder((authLogin, clientSelector, { comw, comment }) => {
          const comments = comCommentsFileStore.getValueWithAutoSave();
          const m = Date.now() + Math.random();
          const commentBox = { comment, comw, m };

          comments[authLogin] ??= {} as never;
          comments[authLogin][comw] = commentBox;

          cmShareServerTsjrpcMethods.refreshComComments({ comments: [commentBox], modifiedAt: m }, clientSelector);
        }),

        setAboutComFavorites: valueSendBuilder((authLogin, clientSelector, userFavorites) => {
          const favorites = aboutComFavoritesFileStore.getValueWithAutoSave();

          const modifiedAt = Date.now() + Math.random();
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
