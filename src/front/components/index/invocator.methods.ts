import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { authIDB } from '$index/db/auth-idb';
import { soki } from 'front/soki';
import { LocalSokiAuth } from 'shared/api';
import { IndexSokiInvocatorModel } from 'shared/api/invocators/index/basics-invocators.model';

const tgAuthorize = async ({ auth, token }: { auth: LocalSokiAuth; token: string }) => {
  await authIDB.set.auth(auth);
  await authIDB.set.token(token);

  soki.onBeforeAuthorizeEvent.invoke();
  setTimeout(() => soki.onAuthorizeEvent.invoke(), 100);
};

export const indexSokiInvocatorClientMethods = new (class Index extends SokiInvocatorClient<IndexSokiInvocatorModel> {
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
      },
    });
  }
})();
