import { SokiInvocatorBaseClient } from '#basis/lib/SokiInvocatorBase.client';
import { cmIDB } from '@cm/_db/cm-idb';
import { CmEditorSokiInvocatorSharesModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { comEditorBusiesAtom } from '../pages/compositions';

class CmEditorSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmEditorSokiInvocatorSharesModel> {}
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
