import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmSokiInvocatorSharesModel } from 'shared/api/invocators/cm/invocator.shares.model';
import { cmIDB } from '../_db/cm-idb';

let lastModifiedLocal: null | number = null;
export const setLastModifiedValue = async (lastModified: number) => {
  lastModifiedLocal ??= await cmIDB.get.lastModified();

  if (lastModifiedLocal >= lastModified) return;
  lastModifiedLocal = lastModified;

  cmIDB.set.lastModified(lastModified);
};

class CmSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmSokiInvocatorSharesModel> {
  constructor() {
    super('CmSokiInvocatorBaseClient', {
      editedCom: () => async com => {
        cmIDB.db.coms.put(com);
        cmIDB.db.coms.where({ isRemoved: 1 }).delete();
        setLastModifiedValue(com.m ?? com.w);
      },

      freshComList: () => async icoms => {
        await cmIDB.db.coms.bulkPut(icoms);
        cmIDB.db.coms.where({ isRemoved: 1 }).delete();
        const localIcoms = await cmIDB.db.coms.toArray();
        const max = localIcoms.reduce((max, com) => Math.max(max, com.m ?? com.w), 0);
        setLastModifiedValue(max);
      },

      editedCat: () => async cat => {
        cmIDB.db.cats.put(cat);
        cmIDB.db.cats.where({ isRemoved: 1 }).delete();
        setLastModifiedValue(cat.m ?? cat.w);
      },

      freshCatList: () => async icats => {
        await cmIDB.db.cats.bulkPut(icats);
        cmIDB.db.cats.where({ isRemoved: 1 }).delete();
        const localIcats = await cmIDB.db.cats.toArray();
        const max = localIcats.reduce((max, com) => Math.max(max, com.m ?? com.w), 0);
        setLastModifiedValue(max);
      },

      editedChords:
        () =>
        async ({ chords, modifiedAt }) => {
          cmIDB.set.chordPack(prev => ({ ...prev, ...chords }));
          setLastModifiedValue(modifiedAt);
        },

      freshChordPack:
        () =>
        async ({ pack, modifiedAt }) => {
          if (pack) cmIDB.set.chordPack(pack);
          setLastModifiedValue(modifiedAt);
        },

      freshComComments: () => async comments => {
        cmIDB.db.comComments.bulkPut(comments);
        const modifiedAt = comments.reduce((max, comment) => Math.max(max, comment.m), 0);
        setLastModifiedValue(modifiedAt);
      },

      freshComFavorites: () => async (list, modifiedAt) => {
        cmIDB.set.favoriteComs(list);
        setLastModifiedValue(modifiedAt);
      },
    });
  }
}
export const cmSokiInvocatorBaseClient = new CmSokiInvocatorBaseClient();
