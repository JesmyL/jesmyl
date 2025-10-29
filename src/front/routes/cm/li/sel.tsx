import { CmComListContextValue } from '$cm/entities/com';
import { useCmComSelectedList } from '$cm/ext';
import { CmSelectedComs } from '$cm/pages/SelectedComsPage';
import { makeCmComNestedRoute } from '$cm/shared/lib';
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
