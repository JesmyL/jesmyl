import { cmComSelectedComwsAtom } from '$cm/entities/com';
import { CmSelectedComs } from '$cm/pages/SelectedComsPage';
import { makeCmComNestedRoute } from '$cm/shared/lib';
import { createFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';

export const Route = createFileRoute('/cm/li/sel')(
  makeCmComNestedRoute({
    path: '/cm/li/sel',
    RouteComponent,
    useComwList: () => useAtomValue(cmComSelectedComwsAtom),
    isIgnoreSearch: true,
  }),
);

function RouteComponent() {
  return <CmSelectedComs />;
}
