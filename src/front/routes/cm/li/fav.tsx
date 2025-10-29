import { CmComListContextValue } from '$cm/entities/com';
import { useCmComFavouriteList } from '$cm/entities/com-favourite';
import { CmFavouriteComsPage } from '$cm/pages/FavouriteComsPage';
import { makeCmComNestedRoute } from '$cm/shared/lib';
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
  return <CmFavouriteComsPage />;
}

function useComListPack(): CmComListContextValue {
  const list = useCmComFavouriteList().favouriteComs;

  return useMemo(() => {
    return { list, pageTitlePostfix: ' - Избранное' };
  }, [list]);
}
