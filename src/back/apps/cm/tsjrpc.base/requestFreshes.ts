import { constantsConfigFileStore } from 'back/apps/index/schedules/file-stores';
import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { FileStore } from 'back/complect/FileStore';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { comDB, sch2ComDB, selectUserExt, user2ComDB, userDB, userExtDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { selectUser2Com } from 'back/drizzle/ex/user2Com.utils';
import { and, DrizzleQueryError, eq, gt } from 'drizzle-orm';
import { ComsInScheduleIntp, ICmComCommentBlock } from 'shared/api';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { Bool, Do } from 'shared/enums';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import { cmShareServerTsjrpcMethodsRefreshComWidRefDictClientSelector } from '../client-selectors-by-visit';
import { catsFileStorage, chordPackFileStore, cmComWidRefGroupDictFileStore } from '../file-stores';
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

    const freshComsInSchEvent = await db
      .select({ it: sch2ComDB })
      .from(sch2ComDB)
      .where(gt(sch2ComDB.intpMod, lastModfiedAt));

    if (objectLength(freshComsInSchEvent)) {
      let mod = 0;
      const intps: ComsInScheduleIntp[] = [];

      for (const { it } of freshComsInSchEvent) {
        mod = Math.max(it.intpMod, mod);
        const sch = await takeScheduleWidgetTiny({ id: it.schId }, false);

        if (it && sch) intps.push({ schw: sch.w, intp: it.intp ?? undefined });
      }

      cmShareServerTsjrpcMethods.freshSchEvComIntp({ intps, mod }, client);
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

      try {
        const userExt = (await selectUserExt({ u: userExtDB }).where(eq(userDB.l, login)).limit(1)).at(0)?.u;

        do {
          let maxMod = 0;

          const commentHolders = await selectUser2Com({
            dl: user2ComDB.comment,
            mod: user2ComDB.commentMod,
            comw: comDB.w,
          }).where(and(eq(userDB.l, login), gt(user2ComDB.commentMod, lastModfiedAt)));

          if (commentHolders.length > 0) {
            const comments: ICmComCommentBlock[] = [];

            commentHolders.forEach(({ dl, mod, comw }) => {
              if (!comw) return;
              if (mod) maxMod = Math.max(maxMod, mod);

              return comments.push({ comw, m: 0, dl: dl || undefined });
            });

            cmShareServerTsjrpcMethods.refreshComComments({ comments, mod: maxMod, alts: userExt?.cmCommAlts }, client);
          }
        } while (Do.Not);

        if (userExt) {
          if (userExt.cmFavComToolsMod > lastModfiedAt) {
            cmShareServerTsjrpcMethods.favTools(
              {
                mod: userExt.cmFavComToolsMod,
                tools: userExt.cmFavComTools,
              },
              client,
            );
          }

          if (userExt.cmFavComMod > lastModfiedAt) {
            cmShareServerTsjrpcMethods.refreshComFavs(
              {
                comws: (
                  await db
                    .select({ w: comDB.w })
                    .from(user2ComDB)
                    .leftJoin(comDB, eq(comDB.id, user2ComDB.comId))
                    .where(and(eq(user2ComDB.isFav, true), eq(user2ComDB.userId, userExt.userId)))
                    .orderBy(comDB.w)
                )
                  .map(it => it.w)
                  .filter(checkIsNotNil),
                mod: userExt.cmFavComMod,
              },
              client,
            );
          }
        }
      } catch (error) {
        throw error instanceof DrizzleQueryError ? (error.cause?.message ?? error.stack ?? error.message) : error;
      }
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
