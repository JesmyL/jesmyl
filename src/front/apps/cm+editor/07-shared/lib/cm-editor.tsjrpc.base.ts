import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { CmShareEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.shares.model';
import { comEditorBusiesAtom } from '../state/com';
import { sharedEeWordsAtom } from '../state/eeWords';

export const cmShareEditorTsjrpcBaseClient =
  new (class CmShareEditorTsjrpcBaseClient extends TsjrpcBaseClient<CmShareEditorTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmShareEditor',
        methods: {
          editedEEWords: async ({ words }) => sharedEeWordsAtom.do.update(prev => ({ ...prev, ...words })),

          comBusies: async ({ busies }) => comEditorBusiesAtom.set(busies),
        },
      });
    }
  })();
