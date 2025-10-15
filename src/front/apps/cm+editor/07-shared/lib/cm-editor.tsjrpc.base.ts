import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { CmShareEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.shares.model';
import { cmEditorIDB } from '../state/cmEditorIDB';
import { comEditorBusiesAtom } from '../state/com';

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

          comBusies: async ({ busies }) => comEditorBusiesAtom.set(busies),
        },
      });
    }
  })();
