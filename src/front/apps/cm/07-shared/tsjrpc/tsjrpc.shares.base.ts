import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { cmComCommentRegisteredAltKeysAtom } from '$cm/entities/com-comment';
import { cmComFavoriteComwsAtom, cmComTopToolsAtom } from '$cm/entities/index';
import { ComsInSchEventComwsPack, ScheduleWidgetWid } from 'shared/api';
import { CmShareTsjrpcModel } from 'shared/api/tsjrpc/cm/share.tsjrpc.model';
import { extractNumber, itInvokeIt, itNumSort } from 'shared/utils';
import { mapObjectEntries, objectValues } from 'shared/utils/object.utils';
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

        comFav_v1: async ({ fav, mod }) => {
          const prevSet = new Set(cmComFavoriteComwsAtom.get());

          mapObjectEntries(fav, (comw, is) => {
            if (is) prevSet.add(extractNumber(comw));
            else prevSet.delete(extractNumber(comw));
          });

          cmComFavoriteComwsAtom.set(Array.from(prevSet).sort(itNumSort));

          updateMod(mod);
        },

        refreshComFavs: async ({ comws, mod }) => {
          cmComFavoriteComwsAtom.set(comws);
          updateMod(mod);
        },

        favTools_v1: async ({ tools, mod }) => {
          cmComTopToolsAtom.set(tools);
          updateMod(mod);
        },

        freshSchEvComIntp_v1: async ({ intps, mod }) => {
          for (const schIntp of intps) {
            const prev = await cmIDB.db.scheduleComIntp.get(schIntp.schw);

            await cmIDB.db.scheduleComIntp.put({ schw: schIntp.schw, intp: { ...prev?.intp, ...schIntp.intp } });
          }

          updateMod(mod);
        },

        freshSchDayEvComws: async ({ packs }) => {
          const schwPackDict: PRecord<ScheduleWidgetWid, ComsInSchEventComwsPack['pack']> = {};
          const invalidateDict: Record<string, () => void> = {};
          let maxw = 0;

          for (const { comws, dayi, eventMi, schw, fio, w } of [packs].flat()) {
            const prev = (schwPackDict[schw] ??= (await cmIDB.db.scheduleComws.get(schw))?.pack ?? {});

            (prev[dayi] ??= {})[eventMi] = { fio, s: comws, w };

            maxw = Math.max(maxw, w);
          }

          await Promise.all(
            mapObjectEntries(schwPackDict, async (schwStr, pack) => {
              const schw = extractNumber(schwStr);
              await cmIDB.db.scheduleComws.put({ schw, pack });
            }),
          );

          objectValues(invalidateDict).forEach(itInvokeIt);
          updateMod(maxw);
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
