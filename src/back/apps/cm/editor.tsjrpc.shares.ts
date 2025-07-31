import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import { CmShareEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.shares.model';

export const cmShareEditorServerTsjrpcMethods =
  new (class CmShareEditor extends TsjrpcServerMethods<CmShareEditorTsjrpcModel> {
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
