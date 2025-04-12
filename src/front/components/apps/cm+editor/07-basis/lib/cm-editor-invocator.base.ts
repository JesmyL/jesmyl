import { SokiInvocatorBaseClient } from '#basis/lib/SokiInvocatorBase.client';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { CmShareEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { comEditorBusiesAtom } from './atoms/com';
import { cmEditorIDB } from './cmEditorIDB';

export const cmShareEditorSokiInvocatorBaseClient =
  new (class CmShareEditorSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmShareEditorSokiInvocatorModel> {
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
