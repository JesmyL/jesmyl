import { soki } from 'front/soki';
import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { LocalSokiAuth } from 'shared/api';
import { IndexBasicsSokiInvocatorModel } from 'shared/api/invocators/index/basics-invocators.model';
import { authIDB } from '../../auth-idb';

const tgAuthorize = async ({ auth, token }: { auth: LocalSokiAuth; token: string }) => {
  await authIDB.set.auth(auth);
  await authIDB.set.token(token);

  soki.onBeforeAuthorizeEvent.invoke();
  setTimeout(() => soki.onAuthorizeEvent.invoke(), 100);
};

class IndexBasicsSokiInvocatorClient extends SokiInvocatorClient<IndexBasicsSokiInvocatorModel> {}
export const indexBasicsSokiInvocatorClient = new IndexBasicsSokiInvocatorClient('IndexBasicsSokiInvocatorClient', {
  requestFreshes: true,
  getDeviceId: true,

  authMeByTelegramNativeButton: tgAuthorize,
  authMeByTelegramBotNumber: tgAuthorize,
  authMeByTelegramMiniButton: tgAuthorize,
  authMeByTelegramInScheduleDay: tgAuthorize,
});
