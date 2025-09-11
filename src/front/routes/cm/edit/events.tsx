import { makeCmEventNestedRoute } from '$cm/basis/lib/cmEventNestedRouteMaker';
import { CmMeetingsPage } from '$cm/pages/MeetingsPage';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/events')(
  makeCmEventNestedRoute({
    path: '/cm/edit/events',
    RouteComponent,
  }),
);

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('cm', 'EVENT', 'R')) return <CmMeetingsPage />;
}
