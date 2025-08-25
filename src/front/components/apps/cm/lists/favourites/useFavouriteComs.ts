import { useToast } from '#shared/ui/modal/useToast';
import { useComs } from '$cm/basis/lib/coms-selections';
import { cmConstantsConfigAtom, cmFavoriteComsAtom } from '$cm/basis/lib/store/atoms';
import { cmUserStoreTsjrpcClient } from '$cm/tsjrpc/user-store.tsjrpc.methods';
import { useAuth } from '$index/atoms';
import { useAtomValue } from 'atomaric';

let saveTimeout: TimeOut;

export const useFavouriteComs = () => {
  const favourites = useAtomValue(cmFavoriteComsAtom);
  const { maxFavouritesCount } = useAtomValue(cmConstantsConfigAtom);
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

      cmFavoriteComsAtom.set(comws.slice(0, maxFavouritesCount));

      if (isOverLimit) {
        toast(`Лимит - ${maxFavouritesCount} избранных`, { mood: 'ko' });
        return;
      }

      if (auth.login == null) return;
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        cmUserStoreTsjrpcClient.setAboutComFavorites({ comws });
      }, 1000);
    },
  };

  return ret;
};
