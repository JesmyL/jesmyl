import { CmComListContextValue } from '$cm/entities/com/lib/current-com-list';
import { createFileRoute } from '@tanstack/react-router';
import { CmCatPage } from 'front/apps/cm/03-pages/CatPage/ui/CatPage';
import { useCmCat } from 'front/apps/cm/06-entities/cat/lib/useCcat';
import { makeCmComNestedRoute } from 'front/apps/cm/07-shared/lib/cmComNestedRouteMaker';
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
