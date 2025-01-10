import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmSokiInvocatorWaitsMethods as CmSokiInvocatorBaseMethods } from 'shared/api/invocators/cm/cm-invocator.waits';
import { cmIDB } from './_db/cm-db';

class CmSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmSokiInvocatorBaseMethods> {}

export const cmSokiInvocatorBaseClient = new CmSokiInvocatorBaseClient('CmSokiInvocatorBaseClient', {
  editedCom: () => async com => cmIDB.db.coms.put(com),
  editedCat: () => async cat => cmIDB.db.cats.put(cat),
});
