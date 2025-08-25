import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { cmComTopToolsAtom, cmFavoriteComsAtom } from '$cm/basis/lib/store/atoms';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { CmShareTsjrpcModel } from 'shared/api/tsjrpc/cm/share.tsjrpc.model';

export const cmShareTsjrpcBaseClient = new (class CmShareTsjrpcBaseClient extends TsjrpcBaseClient<CmShareTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmShare',
      methods: {
        editedCom: async ({ com }) => {
          if (com.isRemoved) {
            await cmIDB.db.coms.where('w').equals(com.w).delete();
          } else {
            await cmIDB.db.coms.put(com);
          }

          cmIDB.updateLastModifiedAt(com.m ?? com.w);
        },

        refreshComList: async ({ coms, modifiedAt, existComws }) => {
          await cmIDB.db.coms.bulkPut(coms);
          cmIDB.db.coms.where('w').noneOf(existComws).delete();
          cmIDB.updateLastModifiedAt(modifiedAt);
        },

        editedCat: async ({ cat }) => {
          if (cat.isRemoved) {
            await cmIDB.db.cats.where('w').equals(cat.w).delete();
          } else {
            await cmIDB.db.cats.put(cat);
          }

          cmIDB.updateLastModifiedAt(cat.m ?? cat.w);
        },

        refreshCatList: async ({ cats, modifiedAt, existCatws }) => {
          await cmIDB.db.cats.bulkPut(cats);
          cmIDB.db.cats.where('w').noneOf(existCatws).delete();
          cmIDB.updateLastModifiedAt(modifiedAt);
        },

        editedChords: async ({ chords, modifiedAt }) => {
          cmIDB.set.chordPack(prev => ({ ...prev, ...chords }));
          cmIDB.updateLastModifiedAt(modifiedAt);
        },

        refreshChordPack: async ({ pack, modifiedAt }) => {
          if (pack) cmIDB.set.chordPack(pack);
          cmIDB.updateLastModifiedAt(modifiedAt);
        },

        refreshComComments: async () => {},

        refreshComCommentBlocks: async ({ comments, modifiedAt }) => {
          await Promise.all(
            comments.map(async comment => {
              await cmIDB.tb.comCommentBlocks.put(comment);
              await cmIDB.tb.localComCommentBlocks.delete(comment.comw);
            }),
          );

          cmIDB.updateLastModifiedAt(modifiedAt);
        },

        refreshAboutComFavorites: async ({ value: favorites }) => {
          if (favorites.comws != null) cmFavoriteComsAtom.set(favorites.comws);
          if (favorites.tools != null) cmComTopToolsAtom.set(favorites.tools);
          cmIDB.updateLastModifiedAt(favorites.m);
        },

        refreshScheduleEventComPacks: async ({ packs: list, modifiedAt }) => {
          cmIDB.db.scheduleComPacks.bulkPut(list);
          cmIDB.updateLastModifiedAt(modifiedAt);
        },
      },
    });
  }
})();
