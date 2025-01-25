import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { IndexBasicsSokiInvocatorModel } from 'shared/api/invocators/index/basics-invocators.model';

class IndexBasicsSokiInvocatorClient extends SokiInvocatorClient<IndexBasicsSokiInvocatorModel> {}
export const indexBasicsSokiInvocatorClient = new IndexBasicsSokiInvocatorClient('IndexBasicsSokiInvocatorClient', {
  getFreshes: true,
  getDeviceId: true,
  authMeByTelegramNativeButton: true,
  authMeByTelegramBotNumber: true,
});
