import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { CmSokiInvocatorSharesModel } from 'shared/api/invocators/cm/invocator.shares.model';
import { cmIDB } from '../_db/cm-idb';

class CmSokiInvocatorBaseClient extends SokiInvocatorBaseClient<CmSokiInvocatorSharesModel> {
  constructor() {
    super('CmSokiInvocatorBaseClient', {
      editedCom: () => async com => {
        cmIDB.db.coms.put(com);
        cmIDB.db.coms.where({ isRemoved: 1 }).delete();
        cmIDB.updateLastModifiedAt(com.m ?? com.w);
      },

      refreshComList: () => async icoms => {
        await cmIDB.db.coms.bulkPut(icoms);
        cmIDB.db.coms.where({ isRemoved: 1 }).delete();
        const localIcoms = await cmIDB.db.coms.toArray();
        const max = localIcoms.reduce((max, com) => Math.max(max, com.m ?? com.w), 0);
        cmIDB.updateLastModifiedAt(max);
      },

      editedCat: () => async cat => {
        cmIDB.db.cats.put(cat);
        cmIDB.db.cats.where({ isRemoved: 1 }).delete();
        cmIDB.updateLastModifiedAt(cat.m ?? cat.w);
      },

      refreshCatList: () => async icats => {
        await cmIDB.db.cats.bulkPut(icats);
        cmIDB.db.cats.where({ isRemoved: 1 }).delete();
        const localIcats = await cmIDB.db.cats.toArray();
        const max = localIcats.reduce((max, com) => Math.max(max, com.m ?? com.w), 0);
        cmIDB.updateLastModifiedAt(max);
      },

      editedChords:
        () =>
        async ({ chords, modifiedAt }) => {
          cmIDB.set.chordPack(prev => ({ ...prev, ...chords }));
          cmIDB.updateLastModifiedAt(modifiedAt);
        },

      refreshChordPack:
        () =>
        async ({ pack, modifiedAt }) => {
          if (pack) cmIDB.set.chordPack(pack);
          cmIDB.updateLastModifiedAt(modifiedAt);
        },

      refreshComComments: () => async comments => {
        cmIDB.db.comComments.bulkPut(comments);
        const modifiedAt = comments.reduce((max, comment) => Math.max(max, comment.m), 0);
        cmIDB.updateLastModifiedAt(modifiedAt);
      },

      refreshComFavorites: () => async (list, modifiedAt) => {
        cmIDB.set.favoriteComs(list);
        cmIDB.updateLastModifiedAt(modifiedAt);
      },

      refreshScheduleEventComPacks: () => async list => {
        cmIDB.db.scheduleComPacks.bulkPut(list);

        const modifiedAt = list.reduce((max, item) => Math.max(max, item.m), 0);
        cmIDB.updateLastModifiedAt(modifiedAt);
      },
    });
  }
}
export const cmSokiInvocatorBaseClient = new CmSokiInvocatorBaseClient();
