import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmEditorSokiInvocatorBaseMethods } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { cmIDB } from '../_db/cm-idb';
import { setLastModifiedValue } from '../_db/invocators/modifieds-invocator.shares.base';

class CmEditorSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmEditorSokiInvocatorBaseMethods> {}
export const cmEditorSokiInvocatorBaseClient = new CmEditorSokiInvocatorBaseClient('CmEditorSokiInvocatorBaseClient', {
  editedEEWords:
    () =>
    async ({ words, modifiedAt }) => {
      cmIDB.setSingleValue('eeStore', prev => ({ ...prev, ...words }));
      setLastModifiedValue(modifiedAt);
    },

  freshEEPack:
    () =>
    async ({ pack, modifiedAt }) => {
      cmIDB.setSingleValue('eeStore', pack);
      setLastModifiedValue(modifiedAt);
    },
});
