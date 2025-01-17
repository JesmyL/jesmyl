import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { IndexFreshSokiInvocatorMethods } from 'shared/api/invocators/index/fresh-invocators.model';

class IndexFreshSokiInvocatorClient extends SokiInvocatorClient<IndexFreshSokiInvocatorMethods> {
  constructor() {
    super('IndexFreshSokiInvocatorClient', {
      getFreshes: true,
    });
  }
}
export const indexFreshSokiInvocatorClient = new IndexFreshSokiInvocatorClient();
