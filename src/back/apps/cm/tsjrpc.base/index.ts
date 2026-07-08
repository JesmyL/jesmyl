import { comsDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { eq } from 'drizzle-orm';
import { CmComWid } from 'shared/api';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { numLeadToHttpLinks } from '../complect/com-http-links';
import { cmEditCatServerTsjrpcBase } from '../edit-cat.tsjrpc.base';
import { cmEditComExternalsTsjrpcBaseServer } from '../edit-com-externals.tsjrpc.base';
import { cmEditComOrderServerTsjrpcBase } from '../edit-com-order.tsjrpc.base';
import { cmEditComServerTsjrpcBase } from '../edit-com.tsjrpc.base';
import { cmEditorTsjrpcBaseServer } from '../editor.tsjrpc.base';
import { cmComAudioMarkPacksFileStore, comCommentsDirStore, comsInSchEventHistoryDirStorage } from '../file-stores';
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

        pullComComments: ({ comw }, { auth }) => {
          const comments = comCommentsDirStore.getItem(takeLogginedAuthOrThrow(auth).login)?.b[comw];

          return {
            value: comments && {
              ...comments,
              comw,
            },
          };
        },

        printComwVisit: async ({ comw }) => {
          const where = eq(comsDB.w, comw);
          const visits = (await db.select({ v: comsDB.visits }).from(comsDB).where(where)).at(0)?.v ?? 0;

          await db
            .update(comsDB)
            .set({ visits: visits + 1 })
            .where(where);
        },

        takeComwVisitsCount: async ({ comw }) => ({
          value: (await db.select({ v: comsDB.visits }).from(comsDB).where(eq(comsDB.w, comw))).at(0)?.v ?? 0,
        }),

        getComwVisits: async () => ({
          value: (await db.select({ v: comsDB.visits, w: comsDB.w }).from(comsDB)).reduce(
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

        getSchEventComPackMod: ({ schw, dayi }) => {
          const history = comsInSchEventHistoryDirStorage.getItem(schw);

          return { value: { mod: history?.d[dayi]?.[0].w ?? 0 } };
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
