import { makeCmComNestedRoute } from '$cm/basis/lib/cmComNestedRouteMaker';
import { CmComListContextValue } from '$cm/basis/lib/contexts/current-com-list';
import { useCat } from '$cm/col/cat/useCcat';
import { CmCatPage } from '$cm/pages/CatPage';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/cm/li/cat/$catw')(
  makeCmComNestedRoute({
    path: '/cm/li/cat/$catw',
    RouteComponent,
    useComListPack,
  }),
);

function RouteComponent() {
  const { catw } = Route.useParams() as { catw: string };
  const cat = useCat(+catw);

  return (
    <CmCatPage
      cat={cat}
      comsCount={cat?.coms.length ?? 0}
      backButtonPath="/cm/li/"
      coms={cat?.coms ?? []}
    />
  );
}

function useComListPack(): CmComListContextValue {
  const { catw } = Route.useParams() as { catw: string };
  const cat = useCat(+catw);

  return useMemo(() => {
    return { list: cat?.coms ?? [], pageTitlePostfix: ` - ${cat?.name ?? 'Категория'}` };
  }, [cat?.coms, cat?.name]);
}
