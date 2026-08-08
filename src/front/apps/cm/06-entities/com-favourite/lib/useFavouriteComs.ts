import { translateBase } from '#basis/locale';
import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { useCmComIComList } from '$cm/entities/com';
import { cmComFavoriteComsAtom } from '$cm/entities/index';
import { cmUserStoreTsjrpcClient } from '$cm/shared/tsjrpc';
import { useAuth } from '$index/shared/state';
import { atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid } from 'shared/api';
import { itNumSort } from 'shared/utils';
import { objectLength } from 'shared/utils/object.utils';
import { toast } from 'sonner';

const favCacheAtom = atom<Record<CmComWid, Bool>>({}, 'cm:comFavCache');

export const useCmComFavouriteList = () => {
  const favourites = useAtomValue(cmComFavoriteComsAtom);
  const { maxFavouritesCount } = useAtomValue(constantsConfigAtom);
  const favouriteComsSet = new Set(favourites);
  const auth = useAuth();
  const favCache = useAtomValue(favCacheAtom);

  useEffect(() => {
    if (!auth.login || !objectLength(favCache)) return;

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(async () => {
          await cmUserStoreTsjrpcClient.comFav_v1({ fav: favCache });
          favCacheAtom.reset();
        }, 1000),
      )
      .effect();
  }, [auth.login, favCache]);

  const ret = {
    favouriteComs: useCmComIComList(favourites),
    isFavourite: (comw: CmComWid) => favouriteComsSet.has(comw),
    toggleFavourite: (comw: CmComWid) => {
      const isFav = ret.isFavourite(comw);

      if (isFav) favouriteComsSet.delete(comw);
      else favouriteComsSet.add(comw);

      const comws = Array.from(favouriteComsSet);
      const isOverLimit = comws.length > maxFavouritesCount;

      cmComFavoriteComsAtom.set(comws.slice(0, maxFavouritesCount).sort(itNumSort));

      if (isOverLimit) {
        toast(
          translateBase(it => it.favNLim, { n: maxFavouritesCount }),
          makeToastKOMoodConfig(),
        );
        return;
      }

      if (!auth.login) return;

      favCacheAtom.do.update(fav => {
        if (comw in fav) delete fav[comw];
        else fav[comw] = +!isFav;
      });
    },
  };

  return ret;
};
