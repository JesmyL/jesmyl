import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { IndexBasicsSokiInvocatorModel } from 'shared/api/invocators/index/basics-invocators.model';

class IndexBasicsSokiInvocatorClient extends SokiInvocatorClient<IndexBasicsSokiInvocatorModel> {
  constructor() {
    super('IndexBasicsSokiInvocatorClient', {
      getFreshes: true,
      getDeviceId: true,
    });
  }
}
export const indexBasicsSokiInvocatorClient = new IndexBasicsSokiInvocatorClient();
