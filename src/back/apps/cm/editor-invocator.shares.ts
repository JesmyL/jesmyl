import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';

class CmEditorSokiInvocatorServer extends SokiInvocatorServer<CmEditorSokiInvocatorModel> {}
export const cmEditorServerInvocatorShareMethods = new CmEditorSokiInvocatorServer('CmEditorSokiInvocatorServer', {
  editedEEWords: true,
  refreshEEPack: true,
  comBusies: true,
});
