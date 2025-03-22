import { SokiInvocatorBaseClient } from '#basis/lib/SokiInvocatorBase.client';
import { CmEditorSokiInvocatorSharesModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { comEditorBusiesAtom } from './atoms/com';
import { cmEditorIDB } from './cmEditorIDB';

class CmEditorSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmEditorSokiInvocatorSharesModel> {}
export const cmEditorSokiInvocatorBaseClient = new CmEditorSokiInvocatorBaseClient('CmEditorSokiInvocatorBaseClient', {
  editedEEWords:
    () =>
    async ({ words, modifiedAt }) => {
      await cmEditorIDB.set.eeStore(prev => ({ ...prev, ...words }));
      cmEditorIDB.updateLastModifiedAt(modifiedAt);
    },

  refreshEEPack:
    () =>
    async ({ pack, modifiedAt }) => {
      await cmEditorIDB.updateLastModifiedAt(modifiedAt);
      cmEditorIDB.set.eeStore(pack);
    },

  comBusies: () => async busies => comEditorBusiesAtom.set(busies),
});
