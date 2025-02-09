import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { cmIDB } from '../_db/cm-idb';
import { comEditorBusiesAtom } from './col/compositions/atoms';

class CmEditorSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmEditorSokiInvocatorModel> {}
export const cmEditorSokiInvocatorBaseClient = new CmEditorSokiInvocatorBaseClient('CmEditorSokiInvocatorBaseClient', {
  editedEEWords:
    () =>
    async ({ words, modifiedAt }) => {
      await cmIDB.set.eeStore(prev => ({ ...prev, ...words }));
      cmIDB.updateLastModifiedAt(modifiedAt);
    },

  refreshEEPack:
    () =>
    async ({ pack, modifiedAt }) => {
      await cmIDB.updateLastModifiedAt(modifiedAt);
      cmIDB.set.eeStore(pack);
    },

  comBusies: () => async busies => comEditorBusiesAtom.set(busies),
});
