import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { cmComCommentRegisteredAltKeysAtom } from '$cm/entities/com-comment';
import { cmComFavoriteComsAtom, cmComTopToolsAtom } from '$cm/entities/index';
import { CmShareTsjrpcModel } from 'shared/api/tsjrpc/cm/share.tsjrpc.model';
import { itNumSort } from 'shared/utils';
import { cmIDB } from '../state/cmIDB';

const updateMod = (mod: number) => cmIDB.updateLastModifiedAt(mod);

export const cmShareTsjrpcBaseClient = new (class CmShareTsjrpcBaseClient extends TsjrpcBaseClient<CmShareTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmShare',
      methods: {
        editedCom: async ({ com, mod }) => {
          if (com.isRemoved) {
            await cmIDB.db.coms.where('w').equals(com.w).delete();
          } else {
            await cmIDB.db.coms.put(com);
          }

          updateMod(mod);
        },

        refreshComList: async ({ coms, modifiedAt }) => {
          updateMod(modifiedAt);
          await cmIDB.db.coms.bulkPut(coms);
          cmIDB.db.coms.where({ isRemoved: 1 }).delete();
        },

        editedCat: async ({ cat }) => {
          if (cat.isRemoved) {
            await cmIDB.db.cats.where('w').equals(cat.w).delete();
          } else {
            await cmIDB.db.cats.put(cat);
          }

          updateMod(cat.m ?? cat.w);
        },

        refreshCatList: async ({ cats, modifiedAt, existCatws }) => {
          await cmIDB.db.cats.bulkPut(cats);
          cmIDB.db.cats.where('w').noneOf(existCatws).delete();
          updateMod(modifiedAt);
        },

        editedChords: async ({ chords, modifiedAt }) => {
          cmIDB.set.chordPack(prev => ({ ...prev, ...chords }));
          updateMod(modifiedAt);
        },

        refreshChordPack: async ({ pack, modifiedAt }) => {
          if (pack) cmIDB.set.chordPack(pack);
          updateMod(modifiedAt);
        },

        refreshComComments: async ({ comments, mod, alts }) => {
          await Promise.all(
            comments.map(async comment => {
              await cmIDB.tb.comCommentBlocks.put(comment);
              await cmIDB.tb.localComCommentBlocks.delete(comment.comw);
            }),
          );

          cmComCommentRegisteredAltKeysAtom.set(alts ?? []);

          updateMod(mod);
        },

        comFav: async ({ comw, is, mod }) => {
          if (is) cmComFavoriteComsAtom.set(prev => [...prev, comw].sort(itNumSort));
          else cmComFavoriteComsAtom.do.removeFirst(comw);

          updateMod(mod);
        },

        refreshComFavs: async ({ comws, mod }) => {
          cmComFavoriteComsAtom.set(comws);
          updateMod(mod);
        },

        favTools: async ({ tools, mod }) => {
          cmComTopToolsAtom.set(tools);
          updateMod(mod);
        },

        freshSchEvComIntp: async ({ intps, mod }) => {
          cmIDB.db.scheduleComIntp.bulkPut(intps);
          updateMod(mod);
        },

        freshSchDayEvComws: async ({ comws, dayi, eventMi, schw, fio, w }) => {
          const prev = await cmIDB.db.scheduleComws.get(schw);

          await cmIDB.db.scheduleComws.put({
            schw,
            pack: {
              ...prev?.pack,
              [dayi]: {
                ...prev?.pack[dayi],
                [eventMi]: {
                  ...prev?.pack[dayi]?.[eventMi],
                  s: comws,
                  fio,
                  w,
                },
              },
            },
          });

          updateMod(w);
        },

        refreshConstConfig: async ({ config, mod }) => {
          constantsConfigAtom.set(prev => ({ ...prev, ...config }));
          updateMod(mod);
        },

        refreshComWidRefDict: async ({ refs, mod }) => {
          cmIDB.set.comWidRefDict(refs);
          updateMod(mod);
        },
      },
    });
  }
})();
