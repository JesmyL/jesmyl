import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { CmFreshSokiInvocatorModel } from 'shared/api/invocators/cm/fresh-invocators.model';

class CmFreshSokiInvocatorClient extends SokiInvocatorClient<CmFreshSokiInvocatorModel> {
  constructor() {
    super('CmFreshSokiInvocatorClient', {
      requestFreshes: true,
    });
  }
}
export const cmFreshesSokiInvocatorClient = new CmFreshSokiInvocatorClient();
