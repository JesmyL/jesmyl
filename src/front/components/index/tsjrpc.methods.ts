import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { authIDB } from '$index/db/auth-idb';
import { soki } from 'front/soki';
import { LocalSokiAuth } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { indexAppUserAccessRightsMatrixAtom } from './atoms';

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
        getUserAccessRights: true,
        updateUserAccessRight: async rights => {
          if (rights == null) return;
          indexAppUserAccessRightsMatrixAtom.set(rights);
        },
      },
    });
  }
})();
