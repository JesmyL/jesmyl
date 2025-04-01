import { FileStore } from 'back/complect/FileStore';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { ICmComComment, IExportableCat, IExportableCom } from 'shared/api';
import { CmFreshSokiInvocatorModel } from 'shared/api/invocators/cm/fresh-invocators.model';
import { smylib } from 'shared/utils';
import { cmCatServerInvocatorBase } from './cat-invocator.base';
import { cmComExternalsSokiInvocatorBaseServer } from './com-externals-invocator.base';
import { cmComServerInvocatorBase } from './com-invocator.base';
import { cmComOrderServerInvocatorBase } from './com-order-invocator.base';
import { chordPackFileStore, cmEditorSokiInvocatorBaseServer } from './editor-invocator.base';
import { eventPacksFileStore } from './file-stores';
import { cmServerInvocatorShareMethods } from './invocator.shares';
import {
  aboutComFavoritesFileStore,
  cmUserStoreSokiInvocatorBaseServer,
  comCommentsFileStore,
} from './user-store-invocator.base';

export const comsFileStore = new FileStore<IExportableCom[]>('/apps/cm/coms.json', []);
export const catsFileStore = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

const sendFreshModifiedableList = <Item extends { m: number }>(
  lastModfiedAt: number,
  store: FileStore<unknown>,
  listMapper: () => Item[],
  send: (list: Item[], modifiedAt: number) => void,
) => {
  if (store.fileModifiedAt() > lastModfiedAt) {
    let modifiedAt = 0;

    const items = listMapper().filter(item => {
      modifiedAt = Math.max(modifiedAt, item.m);
      return item.m > lastModfiedAt;
    });

    if (items.length) send(items, modifiedAt);
  }
};

export const cmFreshServerInvocatorBase =
  new (class CmFreshSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmFreshSokiInvocatorModel> {
    constructor() {
      super({
        className: 'CmFreshSokiInvocatorBaseServer',
        beforeEacheTools: {
          requestFreshes: { minLevel: 0 },
        },
        methods: {
          requestFreshes: async ({ lastModfiedAt }, { client, auth }) => {
            sendFreshModifiedableList(
              lastModfiedAt,
              comsFileStore,
              () => comsFileStore.getValue(),
              (coms, modifiedAt) => cmServerInvocatorShareMethods.refreshComList({ coms, modifiedAt }, client),
            );

            sendFreshModifiedableList(
              lastModfiedAt,
              catsFileStore,
              () => catsFileStore.getValue(),
              (cats, modifiedAt) => cmServerInvocatorShareMethods.refreshCatList({ cats, modifiedAt }, client),
            );

            const chordPackModifiedAt = chordPackFileStore.fileModifiedAt();
            if (!chordPackModifiedAt || chordPackModifiedAt > lastModfiedAt) {
              cmServerInvocatorShareMethods.refreshChordPack(
                {
                  modifiedAt: chordPackModifiedAt,
                  pack: chordPackFileStore.getValue(),
                },
                client,
              );
            }

            sendFreshModifiedableList(
              lastModfiedAt,
              eventPacksFileStore,
              () => smylib.values(eventPacksFileStore.getValue()),
              (items, modifiedAt) =>
                cmServerInvocatorShareMethods.refreshScheduleEventComPacks({ packs: items, modifiedAt }, client),
            );

            if (auth?.login != null) {
              const login = auth.login;

              sendFreshModifiedableList(
                lastModfiedAt,
                comCommentsFileStore,
                () => smylib.values(comCommentsFileStore.getValue()[login]),
                (comments, modifiedAt) =>
                  cmServerInvocatorShareMethods.refreshComComments({ comments, modifiedAt }, client),
              );

              const favoriteItem = aboutComFavoritesFileStore.getValue()[login];
              if (favoriteItem != null && favoriteItem.m > lastModfiedAt)
                cmServerInvocatorShareMethods.refreshAboutComFavorites({ value: favoriteItem }, client);
            }
          },

          exchangeFreshComComments: async ({ modifiedComments, clientDateNow }, { client, auth }) => {
            if (auth?.login == null) throw new Error('Не авторизован');

            const withClientTimeDelta = Date.now() - clientDateNow;

            const comments = comCommentsFileStore.getValue();
            const userServerComments = (comments[auth.login] ??= {});
            let localSavedCommentsMaxModifiedAt = 0;
            const freshComments: ICmComComment[] = [];
            const resultComments: ICmComComment[] = [];

            modifiedComments.forEach(({ comment, comw, m }) => {
              const commentModifiedAt = m + withClientTimeDelta;

              if (userServerComments[comw] != null && commentModifiedAt < userServerComments[comw].m) {
                resultComments.push(userServerComments[comw]);
                return;
              }

              userServerComments[comw] = {
                comment,
                comw,
                m: commentModifiedAt,
              };

              resultComments.push(userServerComments[comw]);
              freshComments.push(userServerComments[comw]);
              localSavedCommentsMaxModifiedAt = Math.max(localSavedCommentsMaxModifiedAt, commentModifiedAt);
            });

            if (localSavedCommentsMaxModifiedAt) {
              comCommentsFileStore.saveValue();

              cmServerInvocatorShareMethods.refreshComComments(
                { comments: freshComments, modifiedAt: localSavedCommentsMaxModifiedAt },
                { login: auth.login, ignoreClient: client },
              );
            }

            return resultComments;
          },
        },
      });
    }
  })();

cmComServerInvocatorBase.$$register();
cmComExternalsSokiInvocatorBaseServer.$$register();
cmCatServerInvocatorBase.$$register();
cmComOrderServerInvocatorBase.$$register();
cmEditorSokiInvocatorBaseServer.$$register();
cmUserStoreSokiInvocatorBaseServer.$$register();
