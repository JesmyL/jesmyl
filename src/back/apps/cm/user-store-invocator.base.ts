import { FileStore } from 'back/complect/FileStorage';
import { SokiServerClientSelector } from 'back/complect/soki/model';
import { SokiInvocatorBaseServer, SokiServerInvocatorTool } from 'back/SokiInvocatorBase.server';
import { CmComWid, ICmComComment } from 'shared/api';
import { CmUserStoreSokiInvocatorModel } from 'shared/api/invocators/cm/user-store-invocators.model';
import { cmServerInvocatorShareMethods } from './invocator.shares';

type TCommentsStore = Record<string, Record<CmComWid, ICmComComment>>;
type TFavoriteComwsStore = Partial<Record<string, { comws: CmComWid[]; m: number }>>;

export const comCommentsFileStore = new FileStore<TCommentsStore>('/apps/cm/comComments.json', {});
export const favoriteComwsFileStore = new FileStore<TFavoriteComwsStore>('/apps/cm/favoriteComws.json', {});

class CmUserStoreSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmUserStoreSokiInvocatorModel> {
  constructor() {
    super('CmUserStoreSokiInvocatorBaseServer', {
      setComComment: valueSendBuilder((authLogin, clientSelector, comw, comment) => {
        const comments = comCommentsFileStore.getValueWithAutoSave();
        const commentBox = { comment, comw, m: Date.now() + Math.random() };

        comments[authLogin] ??= {} as never;
        comments[authLogin][comw] = commentBox;

        cmServerInvocatorShareMethods.freshComComments(clientSelector, [commentBox]);
      }),

      setComFavorites: valueSendBuilder((authLogin, clientSelector, list) => {
        const favorites = favoriteComwsFileStore.getValueWithAutoSave();

        favorites[authLogin] ??= {} as never;
        favorites[authLogin].comws = list;
        const modifiedAt = Date.now() + Math.random();
        favorites[authLogin].m = modifiedAt;

        cmServerInvocatorShareMethods.freshComFavorites(clientSelector, list, modifiedAt);
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

      const ret = action(login, capsule => capsule.auth?.login === login, ...args);
      if (ret === undefined) return;
      ret(tool);
    };
};

export const cmUserStoreSokiInvocatorBaseServer = new CmUserStoreSokiInvocatorBaseServer();
