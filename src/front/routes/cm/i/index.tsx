import { useCmCat } from '$cm/entities/cat';
import { CmComListContextValue } from '$cm/entities/com';
import { useCmComList } from '$cm/ext';
import { CmAllCatPage } from '$cm/pages/AllCatPage';
import { makeCmComNestedRoute } from '$cm/shared/lib';
import { cmInitialInvokes } from '$cm/shared/tsjrpc';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/cm/i/')(
  makeCmComNestedRoute({
    path: '/cm/i/',
    RouteComponent,
    useComListPack,
  }),
);

function RouteComponent() {
  return <CmAllCatPage />;
}

function useComListPack() {
  const cat = useCmCat(0);
  const coms = useCmComList();

  return useMemo((): CmComListContextValue => {
    if (cat == null) return { list: [] };

    return { list: coms, pageTitlePostfix: ' - ' + cat.name };
  }, [cat, coms]);
}

cmInitialInvokes();
