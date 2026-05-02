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
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';
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
