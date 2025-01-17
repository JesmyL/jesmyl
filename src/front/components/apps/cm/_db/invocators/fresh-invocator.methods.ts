import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { CmFreshSokiInvocatorMethods } from 'shared/api/invocators/cm/fresh-invocators.model';

class CmFreshSokiInvocatorClient extends SokiInvocatorClient<CmFreshSokiInvocatorMethods> {
  constructor() {
    super('CmFreshSokiInvocatorClient', {
      getFreshes: true,
    });
  }
}
export const cmFreshesSokiInvocatorClient = new CmFreshSokiInvocatorClient();
