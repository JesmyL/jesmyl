import { useToast } from '#shared/ui/modal/useToast';
import { cmIDB } from '@cm/_db/cm-idb';
import { useComs } from '@cm/cols/useCols';
import { cmUserStoreSokiInvocatorClient } from '@cm/invocators/user-store-invocator.methods';

let saveTimeout: TimeOut;
const maxFavouritesCount = 50;

export const useFavouriteComs = () => {
  const favourites = cmIDB.useValue.favoriteComs();
  const favouriteSet = new Set(favourites);
  const [favouritesToastNode, toast] = useToast();

  const ret = {
    favouritesToastNode,
    favouriteComws: useComs(favourites),
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
        cmUserStoreSokiInvocatorClient.setAboutComFavorites(null, { comws });
      }, 1000);
    },
  };

  return ret;
};
