import { FileStore } from 'back/complect/FileStore';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { ICmComComment, IExportableCat, IExportableCom } from 'shared/api';
import { CmFreshSokiInvocatorModel } from 'shared/api/invocators/cm/fresh-invocators.model';
import { smylib } from 'shared/utils';
import { cmCatServerInvocatorBase } from './cat-invocator.base';
import { cmComExternalsSokiInvocatorBaseServer } from './com-externals-invocator.base';
import { cmComServerInvocatorBase } from './com-invocator.base';
import { cmComOrderServerInvocatorBase } from './com-order-invocator.base';
import { chordPackFileStore, cmEditorSokiInvocatorBaseServer, eePackFileStore } from './editor-invocator.base';
import { cmEditorServerInvocatorShareMethods } from './editor-invocator.shares';
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

class CmFreshSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmFreshSokiInvocatorModel> {}
export const cmFreshServerInvocatorBase = new CmFreshSokiInvocatorBaseServer('CmFreshSokiInvocatorBaseServer', {
  requestFreshes:
    ({ client, auth }) =>
    async lastModfiedAt => {
      sendFreshModifiedableList(
        lastModfiedAt,
        comsFileStore,
        () => comsFileStore.getValue(),
        (coms, modifiedAt) => cmServerInvocatorShareMethods.refreshComList(client, coms, modifiedAt),
      );

      sendFreshModifiedableList(
        lastModfiedAt,
        catsFileStore,
        () => catsFileStore.getValue(),
        (cats, modifiedAt) => cmServerInvocatorShareMethods.refreshCatList(client, cats, modifiedAt),
      );

      const chordPackModifiedAt = chordPackFileStore.fileModifiedAt();
      if (!chordPackModifiedAt || chordPackModifiedAt > lastModfiedAt) {
        cmServerInvocatorShareMethods.refreshChordPack(client, {
          modifiedAt: chordPackModifiedAt,
          pack: chordPackFileStore.getValue(),
        });
      }

      sendFreshModifiedableList(
        lastModfiedAt,
        eventPacksFileStore,
        () => smylib.values(eventPacksFileStore.getValue()),
        (items, modifiedAt) => cmServerInvocatorShareMethods.refreshScheduleEventComPacks(client, items, modifiedAt),
      );

      if (auth != null) {
        if (auth.level >= 50) {
          setTimeout(() => {
            const eePackModifiedAt = eePackFileStore.fileModifiedAt();
            if (eePackModifiedAt > lastModfiedAt) {
              cmEditorServerInvocatorShareMethods.refreshEEPack(client, {
                modifiedAt: chordPackModifiedAt,
                pack: eePackFileStore.getValue(),
              });
            }
          }, 3000);
        }

        if (auth.login != null) {
          const login = auth.login;

          sendFreshModifiedableList(
            lastModfiedAt,
            comCommentsFileStore,
            () => smylib.values(comCommentsFileStore.getValue()[login]),
            (comments, modifiedAt) => cmServerInvocatorShareMethods.refreshComComments(client, comments, modifiedAt),
          );

          const favoriteItem = aboutComFavoritesFileStore.getValue()[login];
          if (favoriteItem != null && favoriteItem.m > lastModfiedAt)
            cmServerInvocatorShareMethods.refreshAboutComFavorites(client, favoriteItem);
        }
      }
    },

  exchangeFreshComComments:
    ({ client, auth }) =>
    async (modifiedComments, clientDateNow) => {
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
          { login: auth.login, ignoreClient: client },
          freshComments,
          localSavedCommentsMaxModifiedAt,
        );
      }

      return resultComments;
    },
});

cmComServerInvocatorBase.$$register();
cmComExternalsSokiInvocatorBaseServer.$$register();
cmCatServerInvocatorBase.$$register();
cmComOrderServerInvocatorBase.$$register();
cmEditorSokiInvocatorBaseServer.$$register();
cmUserStoreSokiInvocatorBaseServer.$$register();
