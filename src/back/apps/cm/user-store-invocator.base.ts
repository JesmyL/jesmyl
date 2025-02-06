import { FileStore } from 'back/complect/FileStore';
import { SokiServerClientSelector } from 'back/complect/soki/model';
import { SokiInvocatorBaseServer, SokiServerInvocatorTool } from 'back/SokiInvocatorBase.server';
import { CmComWidStr, ICmComComment, TAboutComFavoriteItem } from 'shared/api';
import { CmUserStoreSokiInvocatorModel } from 'shared/api/invocators/cm/user-store-invocators.model';
import { cmServerInvocatorShareMethods } from './invocator.shares';

type TCommentsStore = PRecord<string, PRecord<CmComWidStr, ICmComComment>>;
type TUserFavoritesStore = Partial<Record<string, TAboutComFavoriteItem>>;

export const comCommentsFileStore = new FileStore<TCommentsStore>('/apps/cm/comComments.json', {});
export const aboutComFavoritesFileStore = new FileStore<TUserFavoritesStore>('/apps/cm/aboutComFavorites.json', {});

class CmUserStoreSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmUserStoreSokiInvocatorModel> {
  constructor() {
    super('CmUserStoreSokiInvocatorBaseServer', {
      setComComment: valueSendBuilder((authLogin, clientSelector, comw, comment) => {
        const comments = comCommentsFileStore.getValueWithAutoSave();
        const m = Date.now() + Math.random();
        const commentBox = { comment, comw, m };

        comments[authLogin] ??= {} as never;
        comments[authLogin][comw] = commentBox;

        cmServerInvocatorShareMethods.refreshComComments(clientSelector, [commentBox], m);
      }),

      setAboutComFavorites: valueSendBuilder((authLogin, clientSelector, userFavorites) => {
        const favorites = aboutComFavoritesFileStore.getValueWithAutoSave();

        const modifiedAt = Date.now() + Math.random();
        favorites[authLogin] ??= { m: modifiedAt };
        favorites[authLogin].m = modifiedAt;
        if (userFavorites.comws != null) favorites[authLogin].comws = userFavorites.comws;
        if (userFavorites.tools != null) favorites[authLogin].tools = userFavorites.tools;

        cmServerInvocatorShareMethods.refreshAboutComFavorites(clientSelector, favorites[authLogin]);
      }),
    });
  }
}

const valueSendBuilder = <Args extends unknown[]>(
  action: (
    authLogin: string,
    clientSelector: SokiServerClientSelector,
    ...args: Args
  ) => void | ((tool: SokiServerInvocatorTool) => void),
) => {
  return (tool: SokiServerInvocatorTool) =>
    async (...args: Args) => {
      if (tool.auth?.login == null) throw new Error('Не авторизован для отправки user-store');
      const login = tool.auth.login;

      const ret = action(login, (_client, auth) => auth?.login === login, ...args);
      if (ret === undefined) return;
      ret(tool);
    };
};

export const cmUserStoreSokiInvocatorBaseServer = new CmUserStoreSokiInvocatorBaseServer();
