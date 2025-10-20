import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { soki } from '#shared/soki';
import { authIDB } from '$index/db/auth-idb';
import { LocalSokiAuth } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { indexAppUserAccessRightsMatrixAtom } from './atoms';
import { indexIDB } from './db/index-idb';

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
        requestFreshes: true,
        getDeviceId: true,

        authMeByTelegramNativeButton: tgAuthorize,
        authMeByTelegramBotNumber: tgAuthorize,
        authMeByTelegramMiniButton: tgAuthorize,
        authMeByTelegramInScheduleDay: tgAuthorize,

        getFreshAppVersion: true,
        getIndexValues: true,
        getIconExistsPacks: true,

        getAccessRightTitles: true,
        getUserAccessRightsAndRoles: true,

        updateUserAccessRight: async rightsAndRoles => {
          if (rightsAndRoles == null) return;
          indexAppUserAccessRightsMatrixAtom.set(rightsAndRoles);
        },
        updateUserAccessRole: async rightsAndRoles => {
          if (rightsAndRoles == null) return;
          indexAppUserAccessRightsMatrixAtom.set(rightsAndRoles);
        },
        addNewAccessRole: async rightsAndRoles => {
          if (rightsAndRoles == null) return;
          indexAppUserAccessRightsMatrixAtom.set(rightsAndRoles);
        },
        updateRoleAccessRight: async rightsAndRoles => {
          if (rightsAndRoles == null) return;
          indexAppUserAccessRightsMatrixAtom.set(rightsAndRoles);
        },

        getIconPack: ({ pack }) => {
          indexIDB.tb.iconPacks.put({ key: pack[0] as never, pack });
        },
      },
    });
  }
})();
