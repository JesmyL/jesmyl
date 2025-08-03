import { FileStore } from 'back/complect/FileStore';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { ICmComComment, ICmComCommentBlock } from 'shared/api';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { smylib } from 'shared/utils';
import { cmEditCatServerTsjrpcBase } from './edit-cat.tsjrpc.base';
import { cmEditComExternalsTsjrpcBaseServer } from './edit-com-externals.tsjrpc.base';
import { cmEditComOrderServerTsjrpcBase } from './edit-com-order.tsjrpc.base';
import { cmEditComServerTsjrpcBase } from './edit-com.tsjrpc.base';
import { cmEditorTsjrpcBaseServer } from './editor.tsjrpc.base';
import {
  aboutComFavoritesFileStore,
  catsFileStore,
  chordPackFileStore,
  comCommentBlocksFileStore,
  comCommentsFileStore,
  comsFileStore,
  comwVisitsFileStore,
  eventPacksFileStore,
} from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';
import { cmUserStoreTsjrpcBaseServer } from './user-store.tsjrpc.base';

export const cmServerTsjrpcBase = new (class Cm extends TsjrpcBaseServer<CmTsjrpcModel> {
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
            cmShareServerTsjrpcMethods.refreshComList({ coms, modifiedAt, existComws }, client);
          });

          sendBasicModifiedableList(lastModfiedAt, catsFileStore, catsFileStore.getValue, (cats, modifiedAt) => {
            const existCatws = catsFileStore.getValue().filter(filterNotRemoved).map(extractItemw);
            cmShareServerTsjrpcMethods.refreshCatList({ cats, modifiedAt, existCatws }, client);
          });

          const chordPackModifiedAt = chordPackFileStore.fileModifiedAt();
          if (!chordPackModifiedAt || chordPackModifiedAt > lastModfiedAt) {
            cmShareServerTsjrpcMethods.refreshChordPack(
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
                cmShareServerTsjrpcMethods.refreshScheduleEventComPacks({ packs, modifiedAt }, client);
              }
            },
          );

          if (auth?.login != null) {
            const login = auth.login;

            sendBasicModifiedableList(
              lastModfiedAt,
              comCommentBlocksFileStore,
              () => smylib.values(comCommentBlocksFileStore.getValue()[login]),
              (comments, modifiedAt) => {
                if (comments.length > 0) {
                  cmShareServerTsjrpcMethods.refreshComCommentBlocks({ comments, modifiedAt }, client);
                }
              },
            );

            sendBasicModifiedableList(
              lastModfiedAt,
              comCommentsFileStore,
              () => smylib.values(comCommentsFileStore.getValue()[login]),
              (comments, modifiedAt) => {
                if (comments.length > 0) {
                  cmShareServerTsjrpcMethods.refreshComComments({ comments, modifiedAt }, client);
                }
              },
            );

            const favoriteItem = aboutComFavoritesFileStore.getValue()[login];
            if (favoriteItem != null && favoriteItem.m > lastModfiedAt)
              cmShareServerTsjrpcMethods.refreshAboutComFavorites({ value: favoriteItem }, client);
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

            cmShareServerTsjrpcMethods.refreshComComments(
              { comments: freshComments, modifiedAt: localSavedCommentsMaxModifiedAt },
              { login: auth.login, ignoreClient: client },
            );
          }

          return resultComments;
        },

        exchangeFreshComCommentBlocks: async ({ modifiedComments, clientDateNow }, { auth }) => {
          if (auth?.login == null) throw new Error('Не авторизован');

          const withClientTimeDelta = Date.now() - clientDateNow;

          const commentBlocks = comCommentBlocksFileStore.getValue();
          const userServerComments = (commentBlocks[auth.login] ??= {});
          let localSavedCommentsMaxModifiedAt = 0;
          const freshComments: ICmComCommentBlock[] = [];
          const resultComments: ICmComCommentBlock[] = [];

          modifiedComments.forEach(({ d, comw, m }) => {
            const commentModifiedAt = m + withClientTimeDelta;

            if (userServerComments[comw] != null && commentModifiedAt < userServerComments[comw].m) {
              resultComments.push(userServerComments[comw]);
              return;
            }

            userServerComments[comw] = {
              d: { ...userServerComments[comw]?.d, ...d },
              comw,
              m: commentModifiedAt,
            };

            resultComments.push(userServerComments[comw]);
            freshComments.push(userServerComments[comw]);
            localSavedCommentsMaxModifiedAt = Math.max(localSavedCommentsMaxModifiedAt, commentModifiedAt);
          });

          if (localSavedCommentsMaxModifiedAt) {
            comCommentBlocksFileStore.saveValue();

            cmShareServerTsjrpcMethods.refreshComCommentBlocks(
              { comments: freshComments, modifiedAt: localSavedCommentsMaxModifiedAt },
              { login: auth.login },
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

cmEditComServerTsjrpcBase.$$register();
cmEditComExternalsTsjrpcBaseServer.$$register();
cmEditCatServerTsjrpcBase.$$register();
cmEditComOrderServerTsjrpcBase.$$register();
cmEditorTsjrpcBaseServer.$$register();
cmUserStoreTsjrpcBaseServer.$$register();
