import { makeCmComNestedRoute } from '$cm/basis/lib/cmComNestedRouteMaker';
import { useComs } from '$cm/basis/lib/coms-selections';
import { CmComListContextValue } from '$cm/basis/lib/contexts/current-com-list';
import { useCat } from '$cm/col/cat/useCcat';
import { TheAllCatPage } from '$cm/pages/AllCatPage';
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
  return <TheAllCatPage />;
}

function useComListPack() {
  const cat = useCat(0);
  const coms = useComs();

  return useMemo((): CmComListContextValue => {
    if (cat == null) return { list: [] };

    return { list: coms, pageTitlePostfix: ' - ' + cat.name };
  }, [cat, coms]);
}
