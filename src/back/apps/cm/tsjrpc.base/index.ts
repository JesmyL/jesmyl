import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { comDB, user2ComDB, userDB } from 'back/drizzle.schema';
import { db, dbUpdate } from 'back/drizzle/drizzle.db';
import { selectUser2Com } from 'back/drizzle/ex/user2Com.utils';
import { schComHistoryDB } from 'back/drizzle/schema/schComHistory';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { and, desc, eq } from 'drizzle-orm';
import { CmComWid } from 'shared/api';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { numLeadToHttpLinks } from '../complect/com-http-links';
import { cmEditCatServerTsjrpcBase } from '../edit-cat.tsjrpc.base';
import { cmEditComExternalsTsjrpcBaseServer } from '../edit-com-externals.tsjrpc.base';
import { cmEditComOrderServerTsjrpcBase } from '../edit-com-order.tsjrpc.base';
import { cmEditComServerTsjrpcBase } from '../edit-com.tsjrpc.base';
import { cmEditorTsjrpcBaseServer } from '../editor.tsjrpc.base';
import { cmComAudioMarkPacksFileStore } from '../file-stores';
import { cmUserStoreTsjrpcBaseServer } from '../user-store.tsjrpc.base';
import { cmServerTsjrpcBaseExchangeFreshComCommentBlocks } from './exchangeFreshComCommentBlocks';
import { cmServerTsjrpcBaseRequestFreshes } from './requestFreshes';

export const cmServerTsjrpcBase = new (class Cm extends TsjrpcBaseServer<CmTsjrpcModel> {
  constructor() {
    super({
      scope: 'Cm',
      methods: {
        ...cmServerTsjrpcBaseRequestFreshes,
        ...cmServerTsjrpcBaseExchangeFreshComCommentBlocks,

        pullComComments: async ({ comw }, tool) => {
          const auth = takeLogginedAuthOrThrow(tool.auth);

          const user2ComHolder = (
            await selectUser2Com({ c: user2ComDB.comment, mod: user2ComDB.commentMod })
              .where(and(eq(userDB.l, auth.login)))
              .limit(1)
          ).at(0);

          return {
            value:
              user2ComHolder?.c && user2ComHolder?.mod
                ? {
                    m: user2ComHolder.mod,
                    dl: user2ComHolder.c,
                    comw,
                  }
                : undefined,
          };
        },

        printComwVisit: async ({ comw }) => {
          const where = eq(comDB.w, comw);
          const visits = (await db.select({ v: comDB.visits }).from(comDB).where(where).limit(1)).at(0)?.v ?? 0;

          await dbUpdate(comDB, { visits: visits + 1 }, where);
        },

        takeComwVisitsCount: async ({ comw }) => ({
          value: (await db.select({ v: comDB.visits }).from(comDB).where(eq(comDB.w, comw)).limit(1)).at(0)?.v ?? 0,
        }),

        getComwVisits: async () => ({
          value: (await db.select({ v: comDB.visits, w: comDB.w }).from(comDB)).reduce(
            (acc, { v, w }) => {
              acc[w] = v;
              return acc;
            },
            {} as PRecord<CmComWid, number>,
          ),
        }),

        takeFreshComAudioMarksPack: ({ mod, src }) => {
          if (!mod) throw 'Ошибка 51712343778';

          const allMarkPacks = cmComAudioMarkPacksFileStore.getValue();

          return {
            value: !allMarkPacks[src]?.cMarks || allMarkPacks[src].m <= mod ? null : { ...allMarkPacks[src], src },
          };
        },

        getSchEventComPackMod: async ({ schw, dayi }) => {
          const sch = await takeScheduleWidgetTiny({ w: schw });
          const result = (
            await db
              .select({ w: schComHistoryDB.w })
              .from(schComHistoryDB)
              .where(and(eq(schComHistoryDB.schId, sch.id), eq(schComHistoryDB.dayi, dayi)))
              .orderBy(desc(schComHistoryDB.w))
              .limit(1)
          ).at(0);

          return { value: { mod: result?.w ?? 0 } };
        },

        getLinkLeadNumHost: ({ num }) => ({ value: { host: numLeadToHttpLinks[`${num}~`]?.split('/')[2] } }),
      },
    });
  }
})();

cmEditComServerTsjrpcBase.$$register();
cmEditComExternalsTsjrpcBaseServer.$$register();
cmEditCatServerTsjrpcBase.$$register();
cmEditComOrderServerTsjrpcBase.$$register();
cmEditorTsjrpcBaseServer.$$register();
cmUserStoreTsjrpcBaseServer.$$register();
