import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { CmShareEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.shares.model';
import { comEditorBusiesAtom } from './atoms/com';
import { cmEditorIDB } from './cmEditorIDB';

export const cmShareEditorTsjrpcBaseClient =
  new (class CmShareEditorTsjrpcBaseClient extends TsjrpcBaseClient<CmShareEditorTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmShareEditor',
        methods: {
          editedEEWords: async ({ words, modifiedAt }) => {
            await cmEditorIDB.set.eeStore(prev => ({ ...prev, ...words }));
            await cmEditorIDB.updateLastModifiedAt(modifiedAt);
          },

          refreshEEPack: async ({ pack, modifiedAt }) => {
            await cmEditorIDB.set.eeStore(pack);
            await cmEditorIDB.updateLastModifiedAt(modifiedAt);
          },

          refreshConstantsConfig: async ({ config, modifiedAt }) => {
            await cmIDB.set.constantsConfig(prev => ({ ...prev, ...config }));
            await cmEditorIDB.updateLastModifiedAt(modifiedAt);
          },

          comBusies: async ({ busies }) => comEditorBusiesAtom.set(busies),
        },
      });
    }
  })();
