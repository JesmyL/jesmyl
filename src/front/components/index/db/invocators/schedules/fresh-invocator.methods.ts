import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { soki } from 'front/soki';
import { LocalSokiAuth } from 'shared/api';
import { IndexBasicsSokiInvocatorModel } from 'shared/api/invocators/index/basics-invocators.model';
import { authIDB } from '../../auth-idb';

const tgAuthorize = async ({ auth, token }: { auth: LocalSokiAuth; token: string }) => {
  await authIDB.set.auth(auth);
  await authIDB.set.token(token);

  soki.onBeforeAuthorizeEvent.invoke();
  setTimeout(() => soki.onAuthorizeEvent.invoke(), 100);
};

export const indexBasicsSokiInvocatorClient =
  new (class IndexBasicsSokiInvocatorClient extends SokiInvocatorClient<IndexBasicsSokiInvocatorModel> {
    constructor() {
      super({
        className: 'IndexBasicsSokiInvocatorClient',
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
