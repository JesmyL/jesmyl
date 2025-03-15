import { makeCmComNestedRoute } from '$cm/basis/lib/cmComNestedRouteMaker';
import { CmComListContextValue } from '$cm/basis/lib/contexts/current-com-list';
import { useFavouriteComs } from '$cm/lists/favourites/useFavouriteComs';
import { CmFavoriteComsPage } from '$cm/pages/FavouriteComsPage';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/cm/li/fav')(
  makeCmComNestedRoute({
    path: '/cm/li/fav',
    RouteComponent,
    useComListPack,
  }),
);

function RouteComponent() {
  return <CmFavoriteComsPage />;
}

function useComListPack(): CmComListContextValue {
  const list = useFavouriteComs().favouriteComs;

  return useMemo(() => {
    return { list, pageTitlePostfix: ' - Избранное' };
  }, [list]);
}
