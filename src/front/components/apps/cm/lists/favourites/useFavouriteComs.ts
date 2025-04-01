import { useToast } from '#shared/ui/modal/useToast';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useComs } from '$cm/basis/lib/coms-selections';
import { cmUserStoreSokiInvocatorClient } from '$cm/invocators/user-store-invocator.methods';

let saveTimeout: TimeOut;
const maxFavouritesCount = 30;

export const useFavouriteComs = () => {
  const favourites = cmIDB.useValue.favoriteComs();
  const favouriteSet = new Set(favourites);
  const toast = useToast();

  const ret = {
    favouriteComs: useComs(favourites),
    isFavourite: (comw: number) => favouriteSet.has(comw),
    toggleFavourite: (comw: number) => {
      if (ret.isFavourite(comw)) favouriteSet.delete(comw);
      else favouriteSet.add(comw);

      const comws = Array.from(favouriteSet);
      const isOverLimit = comws.length > maxFavouritesCount;

      cmIDB.set.favoriteComs(comws.slice(0, maxFavouritesCount));

      if (isOverLimit) {
        toast(`Лимит - ${maxFavouritesCount} избранных`, { mood: 'ko' });
        return;
      }

      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        cmUserStoreSokiInvocatorClient.setAboutComFavorites({ comws });
      }, 1000);
    },
  };

  return ret;
};
