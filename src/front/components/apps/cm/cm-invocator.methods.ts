import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { CmSokiInvocatorMethods } from 'shared/api/invocators/cm/cm-invocators';
import { cmIDB } from './_db/cm-db';

class CmFreshesSokiInvocatorClient extends SokiInvocatorClient<CmSokiInvocatorMethods> {}
export const cmFreshesSokiInvocatorClient = new CmFreshesSokiInvocatorClient('CmFreshesSokiInvocatorClient', {
  getFreshComList: async icoms => {
    await cmIDB.db.coms.bulkPut(icoms);
    const max = icoms.reduce((max, com) => Math.max(max, com.m ?? com.w), 0);
    await cmIDB.setSingleValue('comLastModified', value => Math.max(max, value), 0);
  },
  getFreshCatList: async icats => {
    await cmIDB.db.cats.bulkPut(icats);
    const max = icats.reduce((max, com) => Math.max(max, com.m ?? com.w), 0);
    await cmIDB.setSingleValue('catLastModified', value => Math.max(max, value), 0);
  },
  getFreshChordPackList: async ({ pack, modifiedAt }) => {
    if (pack) cmIDB.setSingleValue('chordPack', pack);
    await cmIDB.setSingleValue('catLastModified', value => Math.max(modifiedAt, value), 0);
  },
});
