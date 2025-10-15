import { makeToastKOMoodConfig } from '#shared/ui/modal/toast.configs';
import { useCmComList } from '$cm/entities/com';
import { cmComFavoriteComsAtom } from '$cm/entities/index';
import { cmConstantsConfigAtom } from '$cm/shared/state';
import { cmUserStoreTsjrpcClient } from '$cm/shared/tsjrpc';
import { useAuth } from '$index/atoms';
import { useAtomValue } from 'atomaric';
import { toast } from 'sonner';

let saveTimeout: TimeOut;

export const useCmComFavouriteList = () => {
  const favourites = useAtomValue(cmComFavoriteComsAtom);
  const { maxFavouritesCount } = useAtomValue(cmConstantsConfigAtom);
  const favouriteComsSet = new Set(favourites);
  const auth = useAuth();

  const ret = {
    favouriteComs: useCmComList(favourites),
    favouriteComsSet,
    isFavourite: (comw: number) => favouriteComsSet.has(comw),
    toggleFavourite: (comw: number) => {
      if (ret.isFavourite(comw)) favouriteComsSet.delete(comw);
      else favouriteComsSet.add(comw);

      const comws = Array.from(favouriteComsSet);
      const isOverLimit = comws.length > maxFavouritesCount;

      cmComFavoriteComsAtom.set(comws.slice(0, maxFavouritesCount));

      if (isOverLimit) {
        toast(`Лимит - ${maxFavouritesCount} избранных`, makeToastKOMoodConfig());
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
