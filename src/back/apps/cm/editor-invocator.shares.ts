import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmEditorSokiInvocatorSharesModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';

export const cmEditorServerInvocatorShareMethods =
  new (class CmEditorSokiInvocatorServer extends SokiInvocatorServer<CmEditorSokiInvocatorSharesModel> {
    constructor() {
      super({
        className: 'CmEditorSokiInvocatorServer',
        methods: {
          editedEEWords: true,
          refreshEEPack: true,
          comBusies: true,
        },
      });
    }
  })();
