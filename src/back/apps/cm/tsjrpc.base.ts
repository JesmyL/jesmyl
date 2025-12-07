import { FileStore } from 'back/complect/FileStore';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { ICmComCommentBlock } from 'shared/api';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { SMyLib, smylib } from 'shared/utils';
import { makeCmComNumLeadLinkFromHttp } from './complect/com-http-links';
import { mapCmImportableToExportableCom } from './complect/tools';
import { cmEditCatServerTsjrpcBase } from './edit-cat.tsjrpc.base';
import { cmEditComExternalsTsjrpcBaseServer } from './edit-com-externals.tsjrpc.base';
import { cmEditComOrderServerTsjrpcBase } from './edit-com-order.tsjrpc.base';
import { cmEditComServerTsjrpcBase } from './edit-com.tsjrpc.base';
import { cmEditorTsjrpcBaseServer } from './editor.tsjrpc.base';
import {
  aboutComFavoritesFileStore,
  catsFileStore,
  chordPackFileStore,
  cmComAudioMarkPacksFileStore,
  cmConstantsConfigFileStore,
  comCommentsDirStore,
  comsDirStore,
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
      methods: {
        requestFreshes: async ({ lastModfiedAt }, { client, auth, visitInfo }) => {
          const freshComs = comsDirStore.getFreshItems(lastModfiedAt);

          if (freshComs.items.length) {
            cmShareServerTsjrpcMethods.refreshComList(
              {
                coms: freshComs.items.map(mapCmImportableToExportableCom),
                modifiedAt: freshComs.maxMod,
                existComws: comsDirStore.getAllIds(),
              },
              client,
            );
          }

          sendBasicModifiedableList(lastModfiedAt, catsFileStore, catsFileStore.getValue, (cats, modifiedAt) => {
            const existCatws = catsFileStore.getValue().filter(filterNotRemoved).map(extractItemw);
            cmShareServerTsjrpcMethods.refreshCatList({ cats, modifiedAt, existCatws }, client);
          });

          if (chordPackFileStore.fileModifiedAt() > lastModfiedAt) {
            cmShareServerTsjrpcMethods.refreshChordPack(
              {
                modifiedAt: chordPackFileStore.fileModifiedAt(),
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

          if (visitInfo && visitInfo.version > 1039)
            if (cmConstantsConfigFileStore.fileModifiedAt() > lastModfiedAt) {
              cmShareServerTsjrpcMethods.refreshConstantsConfig(
                {
                  config: cmConstantsConfigFileStore.getValue(),
                  modifiedAt: cmConstantsConfigFileStore.fileModifiedAt(),
                },
                client,
              );
            }

          if (auth?.login != null) {
            const login = auth.login;
            const commentsLastModified = comCommentsDirStore.getItemModTime(login);

            if (commentsLastModified != null && commentsLastModified > lastModfiedAt) {
              do {
                const commentsHolder = comCommentsDirStore.getItem(login);

                const blocks = commentsHolder?.b;
                if (commentsHolder && (commentsHolder.fio == null || commentsHolder.fio !== auth.fio)) {
                  commentsHolder.fio = auth.fio;
                  comCommentsDirStore.saveItem(login);
                }

                if (blocks == null) break;

                const comments = SMyLib.keys(blocks)
                  .filter(comw => blocks[comw] != null && blocks[comw].m > lastModfiedAt)
                  .map(strComw => ({
                    m: 0,
                    d: {},
                    comw: +strComw,
                    ...blocks[strComw],
                  }));

                if (comments.length > 0) {
                  cmShareServerTsjrpcMethods.refreshComCommentBlocks(
                    { comments, modifiedAt: commentsLastModified },
                    client,
                  );
                }
              } while (Math.ceil(0));
            }

            const favoriteItem = aboutComFavoritesFileStore.getValue()[login];

            if (favoriteItem && !favoriteItem.fio) {
              favoriteItem.fio = auth.fio ?? '?';
              aboutComFavoritesFileStore.saveValue();
            }

            if (favoriteItem != null && favoriteItem.m > lastModfiedAt)
              cmShareServerTsjrpcMethods.refreshAboutComFavorites({ value: favoriteItem }, client);
          }
        },

        replaceUserAltCommentBlocks: async ({ from: transferAltFrom, to: transferAltTo, comw }, { auth, client }) => {
          if (!auth?.login) throw 'Для обмена специальными комментариями нужна авторизация';
          const commentBlock = comCommentsDirStore.getItem(auth.login)?.b[comw];
          if (commentBlock == null) return;

          const fromAlt = transferAltFrom == null ? commentBlock.d : commentBlock.alt?.[transferAltFrom];
          const toAlt = transferAltTo == null ? commentBlock.d : commentBlock.alt?.[transferAltTo];

          const alt = (commentBlock.alt ??= {});

          if (transferAltFrom != null && transferAltTo != null) {
            alt[transferAltFrom] = toAlt;
            alt[transferAltTo] = fromAlt;
          } else if (transferAltTo != null && transferAltFrom == null) {
            commentBlock.d = toAlt ?? {};
            alt[transferAltTo] = fromAlt;
          } else if (transferAltFrom != null && transferAltTo == null) {
            commentBlock.d = fromAlt ?? {};
            alt[transferAltFrom] = toAlt;
          }

          cmShareServerTsjrpcMethods.refreshComCommentBlocks(
            { comments: [{ ...commentBlock, comw }], modifiedAt: Date.now() },
            client,
          );

          commentBlock.m = Date.now();

          comCommentsDirStore.saveItem(auth.login);
        },

        pullUserAltCommentBlock: async ({ comw, login }) => {
          return { value: comCommentsDirStore.getItem(login)?.b[comw] ?? null };
        },

        exchangeFreshComCommentBlocks: async ({ modifiedComments, clientDateNow }, { auth }) => {
          if (auth?.login == null) throw new Error('Не авторизован');

          const withClientTimeDelta = Date.now() - clientDateNow;

          const commentsHolder = comCommentsDirStore.getOrCreateItem(auth.login, null, auth.login);
          commentsHolder.fio = auth.fio;
          const userServerComments = commentsHolder.b;

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
            comCommentsDirStore.saveItem(auth.login);

            cmShareServerTsjrpcMethods.refreshComCommentBlocks(
              { comments: freshComments, modifiedAt: localSavedCommentsMaxModifiedAt },
              { login: auth.login },
            );
          }

          return { value: resultComments };
        },

        printComwVisit: async ({ comw }) => {
          const marks = comwVisitsFileStore.getValueWithAutoSave();
          marks[comw] ??= 0;
          marks[comw]++;
        },

        takeComwVisitsCount: async ({ comw }) => ({ value: comwVisitsFileStore.getValue()[comw] ?? 0 }),
        getComwVisits: async () => ({ value: comwVisitsFileStore.getValue() }),

        takeFreshComAudioMarksPack: async ({ lastModfiedAt, src }) => {
          const allMarkPacks = cmComAudioMarkPacksFileStore.getValue();
          const srcMarksPack = allMarkPacks[makeCmComNumLeadLinkFromHttp(src)];

          return { value: !srcMarksPack || srcMarksPack.m <= lastModfiedAt ? null : { ...srcMarksPack, src } };
        },
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
