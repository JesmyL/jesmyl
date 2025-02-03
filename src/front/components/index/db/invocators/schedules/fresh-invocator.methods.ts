import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { LocalSokiAuth } from 'shared/api';
import { IndexBasicsSokiInvocatorModel } from 'shared/api/invocators/index/basics-invocators.model';
import { authIDB } from '../../auth-idb';

const auth = ({ auth, token }: { auth: LocalSokiAuth; token: string }) => {
  authIDB.set.auth(auth);
  authIDB.set.token(token);
};

class IndexBasicsSokiInvocatorClient extends SokiInvocatorClient<IndexBasicsSokiInvocatorModel> {}
export const indexBasicsSokiInvocatorClient = new IndexBasicsSokiInvocatorClient('IndexBasicsSokiInvocatorClient', {
  requestFreshes: true,
  getDeviceId: true,
  authMeByTelegramNativeButton: auth,
  authMeByTelegramBotNumber: auth,
  authMeByTelegramMiniButton: auth,
  authMeByTelegramInScheduleDay: auth,
});
