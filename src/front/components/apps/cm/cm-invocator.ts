import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { CmComSokiInvocatorMethods } from 'shared/api/invocators/cm/cm-invocators';

class CmComSokiInvocatorClient extends SokiInvocatorClient<CmComSokiInvocatorMethods> {}

export const cmClientInvocatorMethods = new CmComSokiInvocatorClient('CmComSokiInvocatorClient', {
  rename: true,
});
