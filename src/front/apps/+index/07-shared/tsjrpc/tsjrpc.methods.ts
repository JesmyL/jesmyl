import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { soki } from '#shared/soki';
import { LocalSokiAuth } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { authIDB, indexAppUserAccessRightsMatrixAtom, indexIDB } from '../state';

const tgAuthorize = async ({ auth, token }: { auth: LocalSokiAuth; token: string }) => {
  await authIDB.set.auth(auth);
  await authIDB.set.token(token);

  soki.onBeforeAuthorizeEvent.invoke();
  setTimeout(() => soki.onAuthorizeEvent.invoke(), 100);
};

export const indexTsjrpcClientMethods = new (class Index extends TsjrpcClient<IndexTsjrpcModel> {
  constructor() {
    super({
      scope: 'Index',
      methods: {
        authMeByTelegramNativeButton: { onResponse: tgAuthorize },
        authMeByTelegramBotNumber: { onResponse: tgAuthorize },
        authMeByTelegramMiniButton: { onResponse: tgAuthorize },
        authMeByTelegramInScheduleDay: { onResponse: tgAuthorize },

        updateUserAccessRight: {
          onResponse: async rightsAndRoles => {
            if (rightsAndRoles == null) return;
            indexAppUserAccessRightsMatrixAtom.set(rightsAndRoles);
          },
        },
        updateUserAccessRole: {
          onResponse: async rightsAndRoles => {
            if (rightsAndRoles == null) return;
            indexAppUserAccessRightsMatrixAtom.set(rightsAndRoles);
          },
        },
        addNewAccessRole: {
          onResponse: async rightsAndRoles => {
            if (rightsAndRoles == null) return;
            indexAppUserAccessRightsMatrixAtom.set(rightsAndRoles);
          },
        },
        updateRoleAccessRight: {
          onResponse: async rightsAndRoles => {
            if (rightsAndRoles == null) return;
            indexAppUserAccessRightsMatrixAtom.set(rightsAndRoles);
          },
        },

        getIconPack: {
          onResponse: ({ pack }) => {
            indexIDB.tb.iconPacks.put({ key: pack[0] as never, pack });
          },
        },
      },
    });
  }
})();
