import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';

class CmEditorSokiInvocatorServer extends SokiInvocatorServer<CmEditorSokiInvocatorModel> {
  constructor() {
    super('CmEditorSokiInvocatorServer', {
      editedEEWords: true,
      refreshEEPack: true,
    });
  }
}

export const cmEditorServerInvocatorShareMethods = new CmEditorSokiInvocatorServer();
