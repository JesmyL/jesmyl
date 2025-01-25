import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { cmIDB } from '../_db/cm-idb';

class CmEditorSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmEditorSokiInvocatorModel> {}
export const cmEditorSokiInvocatorBaseClient = new CmEditorSokiInvocatorBaseClient('CmEditorSokiInvocatorBaseClient', {
  editedEEWords:
    () =>
    async ({ words, modifiedAt }) => {
      cmIDB.set.eeStore(prev => ({ ...prev, ...words }));
      cmIDB.updateLastModifiedAt(modifiedAt);
    },

  refreshEEPack:
    () =>
    async ({ pack, modifiedAt }) => {
      cmIDB.set.eeStore(pack);
      cmIDB.updateLastModifiedAt(modifiedAt);
    },
});
