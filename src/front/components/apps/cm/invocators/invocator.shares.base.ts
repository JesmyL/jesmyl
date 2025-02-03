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

      refreshComList: () => async (icoms, modifiedAt) => {
        await cmIDB.db.coms.bulkPut(icoms);
        cmIDB.db.coms.where({ isRemoved: 1 }).delete();
        cmIDB.updateLastModifiedAt(modifiedAt);
      },

      editedCat: () => async cat => {
        cmIDB.db.cats.put(cat);
        cmIDB.db.cats.where({ isRemoved: 1 }).delete();
        cmIDB.updateLastModifiedAt(cat.m ?? cat.w);
      },

      refreshCatList: () => async (icats, modifiedAt) => {
        await cmIDB.db.cats.bulkPut(icats);
        cmIDB.db.cats.where({ isRemoved: 1 }).delete();
        cmIDB.updateLastModifiedAt(modifiedAt);
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

      refreshComComments: () => async (comments, modifiedAt) => {
        comments.forEach(async comment => {
          const localComment = await cmIDB.tb.comComments.get(comment.comw);
          if (localComment?.isSavedLocal) return;
          cmIDB.tb.comComments.put(comment);
        });

        cmIDB.updateLastModifiedAt(modifiedAt);
      },

      refreshAboutComFavorites: () => async favorites => {
        if (favorites.comws != null) cmIDB.set.favoriteComs(favorites.comws);
        if (favorites.tools != null) cmIDB.set.comTopTools(favorites.tools);
        cmIDB.updateLastModifiedAt(favorites.m);
      },

      refreshScheduleEventComPacks: () => async (list, modifiedAt) => {
        cmIDB.db.scheduleComPacks.bulkPut(list);
        cmIDB.updateLastModifiedAt(modifiedAt);
      },
    });
  }
}
export const cmSokiInvocatorBaseClient = new CmSokiInvocatorBaseClient();
