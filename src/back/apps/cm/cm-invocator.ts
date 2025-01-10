import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmSokiInvocatorWaitsMethods } from 'shared/api/invocators/cm/cm-invocator.waits';

class CmSokiInvocatorServer extends SokiInvocatorServer<CmSokiInvocatorWaitsMethods> {}

export const cmServerInvocatorMethods = new CmSokiInvocatorServer('CmSokiInvocatorServer', {
  editedCom: true,
  editedCat: true,
});
