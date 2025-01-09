import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmSokiInvocatorStreamMethods } from 'shared/api/invocators/cm/cm-invocators';

class CmSokiInvocatorServer extends SokiInvocatorServer<CmSokiInvocatorStreamMethods> {}

export const cmServerInvocatorMethods = new CmSokiInvocatorServer('CmSokiInvocatorServer', {
  editedCom: true,
  editedCat: true,
});
