import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmEditorSokiInvocatorBaseMethods } from 'shared/api/invocators/cm/editor-invocator.shares.model';

class CmEditorSokiInvocatorServer extends SokiInvocatorServer<CmEditorSokiInvocatorBaseMethods> {
  constructor() {
    super('CmEditorSokiInvocatorServer', {
      editedEEWords: true,
      freshEEPack: true,
    });
  }
}

export const cmEditorServerInvocatorShareMethods = new CmEditorSokiInvocatorServer();
