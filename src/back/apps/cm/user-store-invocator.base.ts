import { FileStore } from 'back/complect/FileStore';
import { SokiServerClientSelector } from 'back/complect/soki/model';
import { SokiInvocatorBaseServer, SokiServerInvocatorTool } from 'back/SokiInvocatorBase.server';
import { CmComWid, ICmComComment } from 'shared/api';
import { CmUserStoreSokiInvocatorModel } from 'shared/api/invocators/cm/user-store-invocators.model';
import { cmServerInvocatorShareMethods } from './invocator.shares';

import { smylib, SMyLib } from 'shared/utils';
import * as susJSON from '../index/+case/serverUserStore.json';

const sus = { ...susJSON };
delete (sus as any).default;

type TCommentsStore = Record<string, Record<CmComWid, ICmComComment>>;
type TFavoriteComwsStore = Partial<Record<string, { comws: CmComWid[]; m: number }>>;

export const comCommentsFileStore = new FileStore<TCommentsStore>('/apps/cm/comComments.json', {});
export const favoriteComwsFileStore = new FileStore<TFavoriteComwsStore>('/apps/cm/favoriteComws.json', {});

const comments = comCommentsFileStore.getValueWithAutoSave();
const favorites = favoriteComwsFileStore.getValueWithAutoSave();
const prefix = 'cm/comComment::';

SMyLib.entries(sus).forEach(([login, value]) => {
  const comm = (comments[login] ??= {} as Record<CmComWid, ICmComComment>);

  SMyLib.entries(value).forEach(([key, [m, comment]]) => {
    if (key === ('cm/marks' as never) && smylib.isArr(comment)) {
      if (comment.length) favorites[login] = { comws: comment, m };
      else delete favorites[login];
    }

    if (!key.startsWith(prefix)) return;
    const comw = key.slice(prefix.length) as never as CmComWid;

    comm[comw] = { comment: comment as never, comw, m };
  });

  if (!smylib.keys(comm).length) delete comments[login];
});

class CmUserStoreSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmUserStoreSokiInvocatorModel> {
  constructor() {
    super('CmUserStoreSokiInvocatorBaseServer', {
      setComComment: valueSendBuilder((authLogin, clientSelector, comw, comment) => {
        const comments = comCommentsFileStore.getValueWithAutoSave();
        const commentBox = { comment, comw, m: Date.now() + Math.random() };

        comments[authLogin] ??= {} as never;
        comments[authLogin][comw] = commentBox;

        cmServerInvocatorShareMethods.refreshComComments(clientSelector, [commentBox]);
      }),

      setComFavorites: valueSendBuilder((authLogin, clientSelector, list) => {
        const favorites = favoriteComwsFileStore.getValueWithAutoSave();

        favorites[authLogin] ??= {} as never;
        favorites[authLogin].comws = list;
        const modifiedAt = Date.now() + Math.random();
        favorites[authLogin].m = modifiedAt;

        cmServerInvocatorShareMethods.refreshComFavorites(clientSelector, list, modifiedAt);
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
