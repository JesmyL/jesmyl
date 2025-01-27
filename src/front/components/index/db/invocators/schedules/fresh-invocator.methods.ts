import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { LocalSokiAuth } from 'shared/api';
import { IndexBasicsSokiInvocatorModel } from 'shared/api/invocators/index/basics-invocators.model';
import { indexIDB } from '../../index-idb';

const auth = ({ auth, token }: { auth: LocalSokiAuth; token: string }) => {
  indexIDB.set.auth(auth);
  localStorage.token = token || '';
};

class IndexBasicsSokiInvocatorClient extends SokiInvocatorClient<IndexBasicsSokiInvocatorModel> {}
export const indexBasicsSokiInvocatorClient = new IndexBasicsSokiInvocatorClient('IndexBasicsSokiInvocatorClient', {
  getFreshes: true,
  getDeviceId: true,
  authMeByTelegramNativeButton: auth,
  authMeByTelegramBotNumber: auth,
  authMeByTelegramMiniButton: auth,
  authMeByTelegramInScheduleDay: auth,
});
