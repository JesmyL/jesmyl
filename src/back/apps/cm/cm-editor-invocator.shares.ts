import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmEditorSokiInvocatorBaseMethods } from 'shared/api/invocators/cm/editor-invocator.shares.model';

class CmSokiInvocatorServer extends SokiInvocatorServer<CmEditorSokiInvocatorBaseMethods> {}

export const cmEditorServerInvocatorShareMethods = new CmSokiInvocatorServer('CmSokiInvocatorServer', {
  editedEEWords: true,
  freshEEPack: true,
});
