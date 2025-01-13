import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmSokiInvocatorBaseMethods } from 'shared/api/invocators/cm/invocator.shares.model';
import { cmIDB } from './_db/cm-db';

let lastModifiedValue: null | number = null;
export const setLastModifiedValue = async (lastModified: number) => {
  lastModifiedValue ??= await cmIDB.getSingleValue('lastModified', 0);

  if (lastModifiedValue >= lastModified) return;
  lastModifiedValue = lastModified;

  cmIDB.setSingleValue('lastModified', lastModified);
};

class CmSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmSokiInvocatorBaseMethods> {}
export const cmSokiInvocatorBaseClient = new CmSokiInvocatorBaseClient('CmSokiInvocatorBaseClient', {
  editedCom: () => async com => {
    cmIDB.db.coms.put(com);
    cmIDB.db.coms.where({ isRemoved: 1 }).delete();
    setLastModifiedValue(com.m ?? com.w);
  },

  freshComList: () => async icoms => {
    await cmIDB.db.coms.bulkPut(icoms);
    const max = icoms.reduce((max, com) => Math.max(max, com.m ?? com.w), 0);
    cmIDB.db.coms.where({ isRemoved: 1 }).delete();
    setLastModifiedValue(max);
  },

  editedCat: () => async cat => {
    cmIDB.db.cats.put(cat);
    cmIDB.db.cats.where({ isRemoved: 1 }).delete();
    setLastModifiedValue(cat.m ?? cat.w);
  },

  freshCatList: () => async icats => {
    await cmIDB.db.cats.bulkPut(icats);
    const max = icats.reduce((max, com) => Math.max(max, com.m ?? com.w), 0);
    cmIDB.db.cats.where({ isRemoved: 1 }).delete();
    setLastModifiedValue(max);
  },

  editedChords:
    () =>
    async ({ chords, modifiedAt }) => {
      cmIDB.setSingleValue('chordPack', prev => ({ ...prev, ...chords }));
      setLastModifiedValue(modifiedAt);
    },

  freshChordPack:
    () =>
    async ({ pack, modifiedAt }) => {
      if (pack) cmIDB.setSingleValue('chordPack', pack);
      setLastModifiedValue(modifiedAt);
    },
});
