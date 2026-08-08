import { cmComFavoriteComsAtom } from '$cm/entities/com';
import { CmFavouriteComsPage } from '$cm/pages/FavouriteComsPage';
import { makeCmComNestedRoute } from '$cm/shared/lib';
import { createFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';

export const Route = createFileRoute('/cm/li/fav')(
  makeCmComNestedRoute({
    path: '/cm/li/fav',
    RouteComponent: () => <CmFavouriteComsPage />,
    useComwList: () => useAtomValue(cmComFavoriteComsAtom),
    isIgnoreSearch: true,
  }),
);
