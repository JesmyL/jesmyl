import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmEditorSokiInvocatorBaseMethods } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { cmIDB } from '../_db/cm-db';
import { setLastModifiedValue } from '../cm-invocator.shares.base';

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
      if (pack) cmIDB.setSingleValue('eeStore', pack);
      setLastModifiedValue(modifiedAt);
    },
});
