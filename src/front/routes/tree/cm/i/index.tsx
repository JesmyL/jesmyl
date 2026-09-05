import { useCmComAllWidList } from '$cm/entities/com';
import { CmAllCatPage } from '$cm/pages/AllCatPage';
import { makeCmComNestedRoute } from '$cm/shared/lib';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/i/')(
  makeCmComNestedRoute({
    path: '/cm/i/',
    RouteComponent: () => <CmAllCatPage />,
    useComwList: useCmComAllWidList,
  }),
);
