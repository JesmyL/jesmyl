import { CmComListContextValue } from '$cm/entities/com/lib/current-com-list';
import { createFileRoute } from '@tanstack/react-router';
import { CmSelectedComs } from 'front/apps/cm/03-pages/SelectedComsPage/ui/SelectedComsPage';
import { useCmComSelectedList } from 'front/apps/cm/06-entities/com/lib/useSelectedComs';
import { makeCmComNestedRoute } from 'front/apps/cm/07-shared/lib/cmComNestedRouteMaker';
import { useMemo } from 'react';

export const Route = createFileRoute('/cm/li/sel')(
  makeCmComNestedRoute({
    path: '/cm/li/sel',
    RouteComponent,
    useComListPack,
  }),
);

function RouteComponent() {
  return <CmSelectedComs />;
}

function useComListPack(): CmComListContextValue {
  const list = useCmComSelectedList().selectedComs;

  return useMemo(() => {
    return {
      list,
      pageTitlePostfix: ' - Выбранное',
    };
  }, [list]);
}
