import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmSokiInvocatorWaitsMethods as CmSokiInvocatorBaseMethods } from 'shared/api/invocators/cm/cm-invocator.waits';
import { cmIDB } from './_db/cm-db';

class CmSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmSokiInvocatorBaseMethods> {}

export const cmSokiInvocatorBaseClient = new CmSokiInvocatorBaseClient('CmSokiInvocatorBaseClient', {
  editedCom: () => async com => {
    cmIDB.db.coms.put(com);
    cmIDB.setSingleValue('comLastModified', com.m ?? com.w);
  },
  editedCat: () => async cat => {
    cmIDB.db.cats.put(cat);
    cmIDB.setSingleValue('catLastModified', cat.m ?? cat.w);
  },
  editedChords:
    () =>
    async ({ chords, modifiedAt }) => {
      cmIDB.setSingleValue('chordPack', prev => ({ ...prev, ...chords }));
      cmIDB.setSingleValue('chordPackLastModified', modifiedAt);
    },
});
