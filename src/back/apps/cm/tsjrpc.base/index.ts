import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { numLeadToHttpLinks } from '../complect/com-http-links';
import { cmEditCatServerTsjrpcBase } from '../edit-cat.tsjrpc.base';
import { cmEditComExternalsTsjrpcBaseServer } from '../edit-com-externals.tsjrpc.base';
import { cmEditComOrderServerTsjrpcBase } from '../edit-com-order.tsjrpc.base';
import { cmEditComServerTsjrpcBase } from '../edit-com.tsjrpc.base';
import { cmEditorTsjrpcBaseServer } from '../editor.tsjrpc.base';
import {
  cmComAudioMarkPacksFileStore,
  comCommentsDirStore,
  comsInSchEventHistoryDirStorage,
  comwVisitsFileStore,
} from '../file-stores';
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

        pullUserAltCommentBlock: async ({ comw, login }) => {
          return { value: comCommentsDirStore.getItem(login)?.b[comw] ?? null };
        },

        printComwVisit: ({ comw }) => {
          comwVisitsFileStore.modifyValueWithAutoSave(visitMarks => {
            visitMarks[comw] ??= 0;
            visitMarks[comw]++;
          });
        },

        takeComwVisitsCount: ({ comw }) => ({ value: comwVisitsFileStore.getValue()[comw] ?? 0 }),
        getComwVisits: () => ({ value: comwVisitsFileStore.getValue() }),

        takeFreshComAudioMarksPack: ({ mod, src }) => {
          if (mod == null) throw 'Ошибка 51712343778';

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
