import { useCmCat } from '$cm/entities/cat';
import { CmComListContextValue } from '$cm/entities/com';
import { CmCom } from '$cm/ext';
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

  const comDescription =
    cat?.kind === 'dict'
      ? (com: CmCom) => (
          <div className="text-[.7em] absolute -bottom-[.5em] left-[64px] text-x7/50">{cat.dict?.[com.wid]}</div>
        )
      : undefined;

  return (
    <CmCatPage
      cat={cat}
      comsCount={cat?.coms.length ?? 0}
      backButtonPath="/cm/li/"
      coms={cat?.coms ?? []}
      comDescription={comDescription}
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
