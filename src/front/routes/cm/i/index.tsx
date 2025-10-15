import { useCmCat } from '$cm/entities/cat/lib/useCcat';
import { useCmComList } from '$cm/entities/com/lib/coms-selections';
import { CmComListContextValue } from '$cm/entities/com/lib/current-com-list';
import { createFileRoute } from '@tanstack/react-router';
import { CmAllCatPage } from 'front/apps/cm/03-pages/AllCatPage/ui/Page';
import { makeCmComNestedRoute } from 'front/apps/cm/07-shared/lib/cmComNestedRouteMaker';
import { cmInitialInvokes } from 'front/apps/cm/07-shared/tsjrpc/cm-initial-invokes';
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
