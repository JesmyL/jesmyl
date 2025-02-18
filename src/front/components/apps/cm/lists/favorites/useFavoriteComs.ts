import { cmIDB } from '#basis/lib/idb/cm';
import { cmUserStoreSokiInvocatorClient } from '#basis/lib/invocators/cm/user-store-invocator.methods';
import { CmComWid } from 'shared/api';
import { useComs } from '../../cols/useCols';

let saveTimeout: TimeOut;

export const useFavoriteComs = () => {
  const favorites = cmIDB.useValue.favoriteComs();
  const favoriteSet = new Set(favorites);
  const favoriteComs = useComs(favorites);

  const ret = {
    markedComs: favoriteComs,
    setMarks: (comws: CmComWid[]) => {
      cmIDB.set.favoriteComs(comws);
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        cmUserStoreSokiInvocatorClient.setAboutComFavorites(null, { comws });
      }, 1000);
    },
    toggleMarked: (comw: number) => {
      if (ret.isMarked(comw)) favoriteSet.delete(comw);
      else favoriteSet.add(comw);

      ret.setMarks(Array.from(favoriteSet));
    },
    isMarked: (comw: number) => favoriteSet.has(comw),
  };

  return ret;
};
