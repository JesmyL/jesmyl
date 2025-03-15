import { useSelectedComs } from '$cm/base/useSelectedComs';
import { makeCmComNestedRoute } from '$cm/basis/lib/cmComNestedRouteMaker';
import { CmComListContextValue } from '$cm/basis/lib/contexts/current-com-list';
import { SelectedComs } from '$cm/pages/SelectedComsPage';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/cm/li/sel')(
  makeCmComNestedRoute({
    path: '/cm/li/sel',
    RouteComponent,
    useComListPack,
  }),
);

function RouteComponent() {
  return <SelectedComs />;
}

function useComListPack(): CmComListContextValue {
  const list = useSelectedComs().selectedComs;

  return useMemo(() => {
    return {
      list,
      pageTitlePostfix: ' - Выбранное',
    };
  }, [list]);
}
