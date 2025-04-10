import { SokiServerClientSelector } from 'back/complect/soki/model';
import { SokiInvocatorBaseServer, SokiServerInvocatorTool } from 'back/SokiInvocatorBase.server';
import { CmUserStoreSokiInvocatorModel } from 'shared/api/invocators/cm/user-store-invocators.model';
import { aboutComFavoritesFileStore, comCommentsFileStore } from './file-stores';
import { cmShareServerInvocatorMethods } from './invocator.shares';

const valueSendBuilder = <Args extends object>(
  action: (
    authLogin: string,
    clientSelector: SokiServerClientSelector,
    args: Args,
  ) => void | ((tool: SokiServerInvocatorTool) => void),
) => {
  return async (args: Args, tool: SokiServerInvocatorTool) => {
    if (tool.auth?.login == null) throw 'Не авторизован для отправки user-store';
    const login = tool.auth.login;

    const ret = action(login, (_client, auth) => auth?.login === login, args);
    if (ret === undefined) return;
    ret(tool);
  };
};

export const cmUserStoreSokiInvocatorBaseServer =
  new (class CmUserStore extends SokiInvocatorBaseServer<CmUserStoreSokiInvocatorModel> {
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

            cmShareServerInvocatorMethods.refreshComComments({ comments: [commentBox], modifiedAt: m }, clientSelector);
          }),

          setAboutComFavorites: valueSendBuilder((authLogin, clientSelector, userFavorites) => {
            const favorites = aboutComFavoritesFileStore.getValueWithAutoSave();

            const modifiedAt = Date.now() + Math.random();
            favorites[authLogin] ??= { m: modifiedAt };
            favorites[authLogin].m = modifiedAt;
            if (userFavorites.comws != null) favorites[authLogin].comws = userFavorites.comws;
            if (userFavorites.tools != null) favorites[authLogin].tools = userFavorites.tools;

            cmShareServerInvocatorMethods.refreshAboutComFavorites({ value: favorites[authLogin] }, clientSelector);
          }),
        },
      });
    }
  })();
