import { FileStore } from 'back/complect/FileStore';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { ICmComComment, ICmComCommentBlock } from 'shared/api';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { emptyObject, SMyLib, smylib } from 'shared/utils';
import { cmEditCatServerTsjrpcBase } from './edit-cat.tsjrpc.base';
import { cmEditComExternalsTsjrpcBaseServer } from './edit-com-externals.tsjrpc.base';
import { cmEditComOrderServerTsjrpcBase } from './edit-com-order.tsjrpc.base';
import { cmEditComServerTsjrpcBase } from './edit-com.tsjrpc.base';
import { cmEditorTsjrpcBaseServer } from './editor.tsjrpc.base';
import {
  aboutComFavoritesFileStore,
  catsFileStore,
  chordPackFileStore,
  cmConstantsConfigFileStore,
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
              () => {
                const blocks = comCommentBlocksFileStore.getValue()[login];
                if (blocks == null) return [];

                return SMyLib.keys(blocks).map(strComw => ({
                  m: 0,
                  d: emptyObject,
                  comw: +strComw,
                  ...blocks[strComw],
                }));
              },
              (comments, modifiedAt) => {
                if (comments.length > 0) {
                  cmShareServerTsjrpcMethods.refreshComCommentBlocks({ comments, modifiedAt }, client);
                }
              },
            );

            const favoriteItem = aboutComFavoritesFileStore.getValue()[login];
            if (favoriteItem != null && favoriteItem.m > lastModfiedAt)
              cmShareServerTsjrpcMethods.refreshAboutComFavorites({ value: favoriteItem }, client);
          }
        },

        exchangeFreshComComments: async ({ modifiedComments, clientDateNow }, { auth }) => {
          if (auth?.login == null) return [];

          const withClientTimeDelta = Date.now() - clientDateNow;

          const comments = comCommentsFileStore.getValue();
          const userServerComments = (comments[auth.login] ??= {});
          let localSavedCommentsMaxModifiedAt = 0;
          const freshComments: ICmComComment[] = [];
          // const resultComments: ICmComComment[] = [];

          modifiedComments.forEach(({ comment, comw, m }) => {
            const commentModifiedAt = m + withClientTimeDelta;

            // if (userServerComments[comw] != null && commentModifiedAt < userServerComments[comw].m) {
            //   resultComments.push(userServerComments[comw]);
            //   return;
            // }

            userServerComments[comw] = {
              comment,
              comw,
              m: commentModifiedAt,
            };

            // resultComments.push(userServerComments[comw]);
            freshComments.push(userServerComments[comw]);
            localSavedCommentsMaxModifiedAt = Math.max(localSavedCommentsMaxModifiedAt, commentModifiedAt);
          });

          if (localSavedCommentsMaxModifiedAt) {
            comCommentsFileStore.saveValue();

            // cmShareServerTsjrpcMethods.refreshComComments(
            //   { comments: freshComments, modifiedAt: localSavedCommentsMaxModifiedAt },
            //   { login: auth.login, ignoreClient: client },
            // );
          }

          return [];
        },

        exchangeFreshComCommentBlocks: async ({ modifiedComments, clientDateNow }, { auth }) => {
          if (auth?.login == null) throw new Error('Не авторизован');

          const withClientTimeDelta = Date.now() - clientDateNow;

          const commentBlocks = comCommentBlocksFileStore.getValue();
          const userServerComments = (commentBlocks[auth.login] ??= {});
          let localSavedCommentsMaxModifiedAt = 0;
          const freshComments: ICmComCommentBlock[] = [];
          const resultComments: ICmComCommentBlock[] = [];

          modifiedComments.forEach(({ d, comw, m, alt }) => {
            const commentModifiedAt = m + withClientTimeDelta;

            if (userServerComments[comw] != null && commentModifiedAt < userServerComments[comw].m) {
              resultComments.push({ ...userServerComments[comw], comw });
              return;
            }

            userServerComments[comw] = {
              ...userServerComments[comw],
              d: { ...userServerComments[comw]?.d, ...d },
              m: commentModifiedAt,
            };

            if (alt) {
              const userAlt = (userServerComments[comw].alt ??= {});

              if (
                Array.from(new Set([...smylib.keys(alt), ...smylib.keys(userAlt)])).length <=
                cmConstantsConfigFileStore.getValue().maxComCommentAlternativesCount
              )
                SMyLib.entries(alt).forEach(([altCommentKey, altValue]) => {
                  userAlt[altCommentKey] = { ...userAlt[altCommentKey], ...altValue };
                });
            }

            SMyLib.entries(userServerComments[comw].d ?? {}).forEach(([key, block]) => {
              if (!block) return;

              for (let blocki = block.length - 1; blocki >= 0; blocki--) {
                if (block[blocki]) break;
                block.splice(-1);
              }

              if (!block.length && userServerComments[comw]?.d) delete userServerComments[comw].d[key];
              // TODO: uncomment soon
              // if (userServerComments[comw]?.d && !smylib.keys(userServerComments[comw].d).length) delete userServerComments[comw].d
            });

            SMyLib.entries(userServerComments[comw].alt ?? {}).forEach(([altCommentKey, altBlock]) => {
              if (!altBlock) return;
              SMyLib.entries(altBlock).forEach(([key, block]) => {
                if (block == null) return;

                for (let blocki = block.length - 1; blocki >= 0; blocki--) {
                  if (block[blocki]) break;
                  block.splice(-1);
                }

                if (!block.length && userServerComments[comw]?.alt?.[altCommentKey])
                  delete userServerComments[comw].alt[altCommentKey][key];
              });
            });

            const block: ICmComCommentBlock = { ...userServerComments[comw], comw };
            resultComments.push(block);
            freshComments.push(block);
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

// TODO: remove after uncomment TODO below
const commentBlocks = comCommentBlocksFileStore.getValueWithAutoSave();
smylib.values(commentBlocks).forEach(userBlock => {
  if (!userBlock) return;

  smylib.values(userBlock).forEach(userServerComments => {
    if (userServerComments == null || !userServerComments.d) return;

    SMyLib.entries(userServerComments.d).forEach(([key, block]) => {
      if (!block) return;
      let isChanged = false;

      for (let blocki = block.length - 1; blocki >= 0; blocki--) {
        if (block[blocki]) break;
        block.splice(-1);
        isChanged = true;
      }

      if (!block.length && userServerComments.d) delete userServerComments.d[key];
      // TODO: uncomment soon + restart server > remove
      // if (userServerComments?.d && !smylib.keys(userServerComments.d).length) delete userServerComments.d;

      if (isChanged) userServerComments.m = Date.now();
    });
  });
});
