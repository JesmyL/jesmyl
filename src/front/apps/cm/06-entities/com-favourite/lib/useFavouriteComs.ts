import { translateBase } from '#basis/locale';
import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { cmComAudioPlayerUncacheCom } from '$cm/entities/com-audio-player';
import { cmComFavoriteComwsAtom } from '$cm/entities/index';
import { cmUserStoreTsjrpcClient } from '$cm/shared/tsjrpc';
import { authIDB } from '$index/shared/state';
import { atom, useAtomValue } from 'atomaric';
import { CmComWid } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc, itNumSort } from 'shared/utils';
import { objectLength } from 'shared/utils/object.utils';
import { toast } from 'sonner';

const favCacheAtom = atom<Record<CmComWid, Bool>>({}, 'cm:comFavCache');

const favFlushDelay = 1000;
let favFlushTimeout: TimeOut;

const flushFavCache = async (fav: Record<CmComWid, Bool>) => {
  const { login } = await authIDB.get.auth();

  /** Staged favourites belong to a session; without one they must not be replayed under the next login. */
  if (!login) {
    favCacheAtom.reset();
    return;
  }

  await cmUserStoreTsjrpcClient.comFav_v1({ fav });

  /** Only the flushed snapshot may be cleared: a toggle during the request has already staged a newer one. */
  if (favCacheAtom.get() === fav) favCacheAtom.reset();
};

/**
 * Lock-screen likes stage the cache with no hook mounted, so the flush lives in the module itself:
 * one pending write, a second after the last staging.
 */
const scheduleFavCacheFlush = (fav: Record<CmComWid, Bool>) => {
  clearTimeout(favFlushTimeout);

  if (!objectLength(fav)) return;

  favFlushTimeout = setTimeout(() => void flushFavCache(fav).catch(emptyFunc), favFlushDelay);
};

favCacheAtom.subscribe(scheduleFavCacheFlush);
scheduleFavCacheFlush(favCacheAtom.get());

/** Drops the staged favourites a logged-out user must not sync under the next session. */
export const cmComFavouriteCacheReset = () => favCacheAtom.reset();

/**
 * Toggles a com in the favourites for every caller — the tool buttons and the lock-screen `like`
 * action alike. The visible list updates synchronously; the server cache is staged for a logged-in user only.
 */
export const cmComFavouriteToggle = (comw: CmComWid) => {
  const favouriteComsSet = new Set(cmComFavoriteComwsAtom.get());
  const isFav = favouriteComsSet.has(comw);

  if (isFav) favouriteComsSet.delete(comw);
  else favouriteComsSet.add(comw);

  const { maxFavouritesCount } = constantsConfigAtom.get();
  const comws = Array.from(favouriteComsSet);
  const isOverLimit = comws.length > maxFavouritesCount;

  cmComFavoriteComwsAtom.set(comws.slice(0, maxFavouritesCount).sort(itNumSort));

  if (isOverLimit) {
    toast(
      translateBase(BaseLocaleKey.FavoriteNumberLimit, { n: maxFavouritesCount }),
      makeToastKOMoodConfig(),
    );
    return;
  }

  if (isFav) void cmComAudioPlayerUncacheCom(comw);

  void authIDB.get.auth().then(({ login }) => {
    if (!login) return;

    favCacheAtom.do.update(fav => {
      if (comw in fav) delete fav[comw];
      else fav[comw] = +!isFav;
    });
  });
};

export const useCmComFavouriteList = () => {
  const favouriteComws = useAtomValue(cmComFavoriteComwsAtom);
  const favouriteComsSet = new Set(favouriteComws);

  return {
    favouriteComws,
    isFavourite: (comw: CmComWid) => favouriteComsSet.has(comw),
    toggleFavourite: cmComFavouriteToggle,
  };
};
