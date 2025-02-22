import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmEditorSokiInvocatorSharesModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';

class CmEditorSokiInvocatorServer extends SokiInvocatorServer<CmEditorSokiInvocatorSharesModel> {}
export const cmEditorServerInvocatorShareMethods = new CmEditorSokiInvocatorServer('CmEditorSokiInvocatorServer', {
  editedEEWords: true,
  refreshEEPack: true,
  comBusies: true,
});
