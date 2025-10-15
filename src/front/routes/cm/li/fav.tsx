import { useCmComFavouriteList } from '$cm/entities/com-favourite/lib/useFavouriteComs';
import { CmComListContextValue } from '$cm/entities/com/lib/current-com-list';
import { createFileRoute } from '@tanstack/react-router';
import { CmFavouriteComsPage } from 'front/apps/cm/03-pages/FavouriteComsPage/ui/FavouriteComsPage';
import { makeCmComNestedRoute } from 'front/apps/cm/07-shared/lib/cmComNestedRouteMaker';
import { useMemo } from 'react';

export const Route = createFileRoute('/cm/li/fav')(
  makeCmComNestedRoute({
    path: '/cm/li/fav',
    RouteComponent,
    useComListPack,
  }),
);

function RouteComponent() {
  return <CmFavouriteComsPage />;
}

function useComListPack(): CmComListContextValue {
  const list = useCmComFavouriteList().favouriteComs;

  return useMemo(() => {
    return { list, pageTitlePostfix: ' - Избранное' };
  }, [list]);
}
