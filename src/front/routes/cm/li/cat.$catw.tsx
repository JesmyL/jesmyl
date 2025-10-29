import { useCmCat } from '$cm/entities/cat';
import { CmComListContextValue } from '$cm/entities/com';
import { CmCatPage } from '$cm/pages/CatPage';
import { makeCmComNestedRoute } from '$cm/shared/lib';
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
  const cat = useCmCat(+catw);

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
  const cat = useCmCat(+catw);

  return useMemo(() => {
    return { list: cat?.coms ?? [], pageTitlePostfix: ` - ${cat?.name ?? 'Категория'}` };
  }, [cat?.coms, cat?.name]);
}
