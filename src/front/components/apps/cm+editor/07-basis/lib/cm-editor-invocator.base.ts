import { SokiInvocatorBaseClient } from '#basis/lib/SokiInvocatorBase.client';
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
            cmEditorIDB.updateLastModifiedAt(modifiedAt);
          },

          refreshEEPack: async ({ pack, modifiedAt }) => {
            await cmEditorIDB.updateLastModifiedAt(modifiedAt);
            cmEditorIDB.set.eeStore(pack);
          },

          comBusies: async ({ busies }) => comEditorBusiesAtom.set(busies),
        },
      });
    }
  })();
