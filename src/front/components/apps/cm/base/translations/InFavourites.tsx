import { useFavouriteComs } from '@cm/lists/favourites/useFavouriteComs';
import { useMemo } from 'react';
import { CmComListContext, CmComListContextValue } from './context';

export const CmTranslationComListContextInFavourites = function InFavourites({
  children,
}: {
  children: React.ReactNode;
}) {
  const list = useFavouriteComs().favouriteComws;

  const value = useMemo((): CmComListContextValue => {
    return {
      list,
      pageTitlePostfix: ' - Избранное',
    };
  }, [list]);

  return <CmComListContext.Provider value={value}>{children}</CmComListContext.Provider>;
};
