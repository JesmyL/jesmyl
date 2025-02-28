import { cmIDB } from '@cm/_db/cm-idb';
import { useComs } from '@cm/cols/useCols';
import { cmUserStoreSokiInvocatorClient } from '@cm/invocators/user-store-invocator.methods';

let saveTimeout: TimeOut;

export const useFavouriteComs = () => {
  const favourites = cmIDB.useValue.favoriteComs();
  const favouriteSet = new Set(favourites);

  const ret = {
    favouriteComws: useComs(favourites),
    isFavourite: (comw: number) => favouriteSet.has(comw),
    toggleFavourite: (comw: number) => {
      if (ret.isFavourite(comw)) favouriteSet.delete(comw);
      else favouriteSet.add(comw);

      const comws = Array.from(favouriteSet);

      cmIDB.set.favoriteComs(comws);
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        cmUserStoreSokiInvocatorClient.setAboutComFavorites(null, { comws });
      }, 1000);
    },
  };

  return ret;
};
