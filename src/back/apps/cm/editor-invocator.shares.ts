import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmShareEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';

export const cmShareEditorServerInvocatorMethods =
  new (class CmShareEditor extends SokiInvocatorServer<CmShareEditorSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'CmShareEditor',
        methods: {
          editedEEWords: true,
          refreshEEPack: true,
          comBusies: true,
          refreshConstantsConfig: true,
        },
      });
    }
  })();
