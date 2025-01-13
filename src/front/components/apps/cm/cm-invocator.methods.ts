import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { CmSokiInvocatorMethods } from 'shared/api/invocators/cm/invocators.model';

class CmFreshesSokiInvocatorClient extends SokiInvocatorClient<CmSokiInvocatorMethods> {}
export const cmFreshesSokiInvocatorClient = new CmFreshesSokiInvocatorClient('CmFreshesSokiInvocatorClient', {
  getFreshes: true,
});
