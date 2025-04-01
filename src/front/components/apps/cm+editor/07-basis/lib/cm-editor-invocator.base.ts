import { SokiInvocatorBaseClient } from '#basis/lib/SokiInvocatorBase.client';
import { CmEditorSokiInvocatorSharesModel } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { comEditorBusiesAtom } from './atoms/com';
import { cmEditorIDB } from './cmEditorIDB';

export const cmEditorSokiInvocatorBaseClient =
  new (class CmEditorSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmEditorSokiInvocatorSharesModel> {
    constructor() {
      super({
        className: 'CmEditorSokiInvocatorBaseClient',
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
