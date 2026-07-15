import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { useCmComList } from '$cm/entities/com';
import { cmComFavoriteComsAtom } from '$cm/entities/index';
import { cmUserStoreTsjrpcClient } from '$cm/shared/tsjrpc';
import { useAuth } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import { CmComWid } from 'shared/api';
import { itNumSort } from 'shared/utils';
import { toast } from 'sonner';

export const useCmComFavouriteList = () => {
  const favourites = useAtomValue(cmComFavoriteComsAtom);
  const { maxFavouritesCount } = useAtomValue(constantsConfigAtom);
  const favouriteComsSet = new Set(favourites);
  const auth = useAuth();

  const ret = {
    favouriteComs: useCmComList(favourites),
    isFavourite: (comw: CmComWid) => favouriteComsSet.has(comw),
    toggleFavourite: (comw: CmComWid) => {
      const isFav = ret.isFavourite(comw);

      if (isFav) favouriteComsSet.delete(comw);
      else favouriteComsSet.add(comw);

      const comws = Array.from(favouriteComsSet);
      const isOverLimit = comws.length > maxFavouritesCount;

      cmComFavoriteComsAtom.set(comws.slice(0, maxFavouritesCount).sort(itNumSort));

      if (isOverLimit) {
        toast(`Лимит - ${maxFavouritesCount} избранных`, makeToastKOMoodConfig());
        return;
      }

      if (!auth.login) return;

      cmUserStoreTsjrpcClient.comFav({ comw, is: !isFav });
    },
  };

  return ret;
};
