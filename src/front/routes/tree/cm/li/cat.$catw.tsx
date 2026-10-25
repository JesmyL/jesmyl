import { useCmCatComws, useCmCatICcat } from '$cm/entities/cat';
import { CmCatPage } from '$cm/pages/CatPage';
import { makeCmComNestedRoute } from '$cm/shared/lib';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/li/cat/$catw')(
  makeCmComNestedRoute({
    path: '/cm/li/cat/$catw',
    RouteComponent,
    useComwList: useComListPack,
  }),
);

function RouteComponent() {
  const { catw } = Route.useParams() as { catw: string };
  const cat = useCmCatICcat(+catw);
  const comws = useCmCatComws(cat);
  const comDict = cat?.top.d;

  return (
    <CmCatPage
      icat={cat}
      comsCount={comws.length}
      backButtonPath="/cm/li/"
      comws={comws}
      comDescription={
        comDict
          ? com => <div className="text-[.7em] absolute -bottom-[.5em] left-[64px] text-x7/50">{comDict[com.w]}</div>
          : undefined
      }
    />
  );
}

function useComListPack() {
  const { catw } = Route.useParams() as { catw: string };
  return useCmCatComws(useCmCatICcat(+catw));
}
