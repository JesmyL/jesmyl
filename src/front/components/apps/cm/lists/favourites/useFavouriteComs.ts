import { useToast } from '#shared/ui/modal/useToast';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useComs } from '$cm/basis/lib/coms-selections';
import { cmUserStoreSokiInvocatorClient } from '$cm/invocators/user-store-invocator.methods';
import { useAuth } from '$index/atoms';

let saveTimeout: TimeOut;
const maxFavouritesCount = 30;

export const useFavouriteComs = () => {
  const favourites = cmIDB.useValue.favoriteComs();
  const favouriteComsSet = new Set(favourites);
  const toast = useToast();
  const auth = useAuth();

  const ret = {
    favouriteComs: useComs(favourites),
    favouriteComsSet,
    isFavourite: (comw: number) => favouriteComsSet.has(comw),
    toggleFavourite: (comw: number) => {
      if (ret.isFavourite(comw)) favouriteComsSet.delete(comw);
      else favouriteComsSet.add(comw);

      const comws = Array.from(favouriteComsSet);
      const isOverLimit = comws.length > maxFavouritesCount;

      cmIDB.set.favoriteComs(comws.slice(0, maxFavouritesCount));

      if (isOverLimit) {
        toast(`Лимит - ${maxFavouritesCount} избранных`, { mood: 'ko' });
        return;
      }

      if (auth.login == null) return;
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        cmUserStoreSokiInvocatorClient.setAboutComFavorites({ comws });
      }, 1000);
    },
  };

  return ret;
};
