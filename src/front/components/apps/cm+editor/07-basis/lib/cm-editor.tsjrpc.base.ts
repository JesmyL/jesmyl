import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { cmConstantsConfigAtom } from '$cm/basis/lib/store/atoms';
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
            cmConstantsConfigAtom.set(prev => ({ ...prev, ...config }));
            await cmEditorIDB.updateLastModifiedAt(modifiedAt);
          },

          comBusies: async ({ busies }) => comEditorBusiesAtom.set(busies),
        },
      });
    }
  })();
