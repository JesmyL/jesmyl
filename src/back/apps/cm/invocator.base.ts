import { FileStore } from 'back/complect/FileStore';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { ICmComComment } from 'shared/api';
import { CmSokiInvocatorModel } from 'shared/api/invocators/cm/invocators.model';
import { smylib } from 'shared/utils';
import { cmEditCatServerInvocatorBase } from './edit-cat-invocator.base';
import { cmEditComExternalsSokiInvocatorBaseServer } from './edit-com-externals-invocator.base';
import { cmEditComServerInvocatorBase } from './edit-com-invocator.base';
import { cmEditComOrderServerInvocatorBase } from './edit-com-order-invocator.base';
import { cmEditorSokiInvocatorBaseServer } from './editor-invocator.base';
import {
  aboutComFavoritesFileStore,
  catsFileStore,
  chordPackFileStore,
  comCommentsFileStore,
  comsFileStore,
  comwVisitsFileStore,
  eventPacksFileStore,
} from './file-stores';
import { cmShareServerInvocatorMethods } from './invocator.shares';
import { cmUserStoreSokiInvocatorBaseServer } from './user-store-invocator.base';

export const cmServerInvocatorBase = new (class Cm extends SokiInvocatorBaseServer<CmSokiInvocatorModel> {
  constructor() {
    const filterNotRemoved = <Item extends { isRemoved?: 1 }>(item: Item) => item.isRemoved !== 1;
    const extractItemw = <Item extends { w: number }>(item: Item) => item.w;

    super({
      scope: 'Cm',
      beforeEachTools: {
        requestFreshes: { minLevel: 0 },
      },
      methods: {
        requestFreshes: async ({ lastModfiedAt }, { client, auth }) => {
          sendBasicModifiedableList(lastModfiedAt, comsFileStore, comsFileStore.getValue, (coms, modifiedAt) => {
            const existComws = comsFileStore.getValue().filter(filterNotRemoved).map(extractItemw);
            cmShareServerInvocatorMethods.refreshComList({ coms, modifiedAt, existComws }, client);
          });

          sendBasicModifiedableList(lastModfiedAt, catsFileStore, catsFileStore.getValue, (cats, modifiedAt) => {
            const existCatws = catsFileStore.getValue().filter(filterNotRemoved).map(extractItemw);
            cmShareServerInvocatorMethods.refreshCatList({ cats, modifiedAt, existCatws }, client);
          });

          const chordPackModifiedAt = chordPackFileStore.fileModifiedAt();
          if (!chordPackModifiedAt || chordPackModifiedAt > lastModfiedAt) {
            cmShareServerInvocatorMethods.refreshChordPack(
              {
                modifiedAt: chordPackModifiedAt,
                pack: chordPackFileStore.getValue(),
              },
              client,
            );
          }

          sendBasicModifiedableList(
            lastModfiedAt,
            eventPacksFileStore,
            () => smylib.values(eventPacksFileStore.getValue()),
            (packs, modifiedAt) => {
              if (packs.length > 0) {
                cmShareServerInvocatorMethods.refreshScheduleEventComPacks({ packs, modifiedAt }, client);
              }
            },
          );

          if (auth?.login != null) {
            const login = auth.login;

            sendBasicModifiedableList(
              lastModfiedAt,
              comCommentsFileStore,
              () => smylib.values(comCommentsFileStore.getValue()[login]),
              (comments, modifiedAt) => {
                if (comments.length > 0) {
                  cmShareServerInvocatorMethods.refreshComComments({ comments, modifiedAt }, client);
                }
              },
            );

            const favoriteItem = aboutComFavoritesFileStore.getValue()[login];
            if (favoriteItem != null && favoriteItem.m > lastModfiedAt)
              cmShareServerInvocatorMethods.refreshAboutComFavorites({ value: favoriteItem }, client);
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

            cmShareServerInvocatorMethods.refreshComComments(
              { comments: freshComments, modifiedAt: localSavedCommentsMaxModifiedAt },
              { login: auth.login, ignoreClient: client },
            );
          }

          return resultComments;
        },

        printComwVisit: async ({ comw }) => {
          const marks = comwVisitsFileStore.getValueWithAutoSave();
          marks[comw] ??= 0;
          marks[comw]++;
        },

        takeComwVisitsCount: async ({ comw }) => comwVisitsFileStore.getValue()[comw] ?? 0,
        getComwVisits: async () => comwVisitsFileStore.getValue(),
      },
    });
  }
})();

const sendBasicModifiedableList = <Item extends { m: number }, Value>(
  lastModfiedAt: number,
  store: FileStore<Value>,
  listMapper: () => Item[],
  send: (list: Item[], modifiedAt: number) => void,
) => {
  if (store.fileModifiedAt() <= lastModfiedAt) return;
  const items = listMapper().filter(item => item.m > lastModfiedAt);
  send(items, store.fileModifiedAt());
};

cmEditComServerInvocatorBase.$$register();
cmEditComExternalsSokiInvocatorBaseServer.$$register();
cmEditCatServerInvocatorBase.$$register();
cmEditComOrderServerInvocatorBase.$$register();
cmEditorSokiInvocatorBaseServer.$$register();
cmUserStoreSokiInvocatorBaseServer.$$register();
