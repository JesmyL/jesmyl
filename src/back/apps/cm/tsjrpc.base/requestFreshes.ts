import { constantsConfigFileStore } from 'back/apps/index/schedules/file-stores';
import { FileStore } from 'back/complect/FileStore';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { comDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { and, eq, gt } from 'drizzle-orm';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { Bool } from 'shared/enums';
import { SMyLib } from 'shared/utils';
import { cmShareServerTsjrpcMethodsRefreshComWidRefDictClientSelector } from '../client-selectors-by-visit';
import {
  aboutComFavoritesFileStore,
  catsFileStorage,
  chordPackFileStore,
  cmComWidRefGroupDictFileStore,
  comCommentsDirStore,
  comsInSchEventDirStorage,
} from '../file-stores';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';

export const cmServerTsjrpcBaseRequestFreshes = {
  requestFreshes: async ({ lastModfiedAt }, { client, auth, visitInfo }) => {
    if (
      cmComWidRefGroupDictFileStore.fileModifiedAt() > lastModfiedAt &&
      cmShareServerTsjrpcMethodsRefreshComWidRefDictClientSelector(visitInfo)
    ) {
      const refs = cmComWidRefGroupDictFileStore.getValue();

      cmShareServerTsjrpcMethods.refreshComWidRefDict(
        {
          refs,
          mod: cmComWidRefGroupDictFileStore.fileModifiedAt(),
        },
        client,
      );
    }

    const freshComs = await db
      .select({ c: makePgCheckedSelectExportableComSqlRaw() })
      .from(comDB)
      .where(and(gt(comDB.m, lastModfiedAt), eq(comDB.isRemoved, Bool.False)));

    if (freshComs.length) {
      let maxMod = 0;

      const coms = freshComs.map(it => {
        maxMod = Math.max(maxMod, it.c.m);
        return it.c;
      });

      cmShareServerTsjrpcMethods.refreshComList(
        {
          coms,
          modifiedAt: maxMod,
        },
        client,
      );
    }

    sendBasicModifiedableList(lastModfiedAt, catsFileStorage, catsFileStorage.getValue, (cats, modifiedAt) => {
      const existCatws = catsFileStorage.getValue().filter(filterNotRemoved).map(extractItemw);
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

    const freshComsInSchEvent = comsInSchEventDirStorage.getFreshItems(lastModfiedAt);

    if (freshComsInSchEvent.items.length) {
      cmShareServerTsjrpcMethods.refreshSchEvComPacks(
        { packs: freshComsInSchEvent.items, mod: freshComsInSchEvent.maxMod },
        client,
      );
    }

    if (visitInfo && visitInfo.version > 1039)
      if (constantsConfigFileStore.fileModifiedAt() > lastModfiedAt) {
        cmShareServerTsjrpcMethods.refreshConstConfig(
          {
            config: constantsConfigFileStore.getValue(),
            mod: constantsConfigFileStore.fileModifiedAt(),
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
              comw: +strComw,
              ...blocks[strComw],
            }));

          if (comments.length > 0) {
            cmShareServerTsjrpcMethods.refreshComComments(
              { comments, mod: commentsLastModified, alts: commentsHolder?.alts },
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
} satisfies ServerTsjrpcSatisfy<CmTsjrpcModel>;

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

const filterNotRemoved = <Item extends { isRemoved?: 1 }>(item: Item) => item.isRemoved !== 1;
const extractItemw = <Item extends { w: number }>(item: Item) => item.w;
