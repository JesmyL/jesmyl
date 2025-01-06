import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmSokiInvocatorStreamMethods } from 'shared/api/invocators/cm/cm-invocators';
import { cmIDB } from './_db/cm-db';

class CmSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmSokiInvocatorStreamMethods> {}

export const cmSokiInvocatorBaseClient = new CmSokiInvocatorBaseClient('CmSokiInvocatorBaseClient', {
  editedCom: () => async com => cmIDB.db.coms.put(com),
});
