import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { cmIDB } from '../_db/cm-idb';
import { setLastModifiedValue } from '../invocators/invocator.shares.base';

class CmEditorSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmEditorSokiInvocatorModel> {}
export const cmEditorSokiInvocatorBaseClient = new CmEditorSokiInvocatorBaseClient('CmEditorSokiInvocatorBaseClient', {
  editedEEWords:
    () =>
    async ({ words, modifiedAt }) => {
      cmIDB.set.eeStore(prev => ({ ...prev, ...words }));
      setLastModifiedValue(modifiedAt);
    },

  freshEEPack:
    () =>
    async ({ pack, modifiedAt }) => {
      cmIDB.set.eeStore(pack);
      setLastModifiedValue(modifiedAt);
    },
});
