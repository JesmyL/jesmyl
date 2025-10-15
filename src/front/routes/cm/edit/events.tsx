import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { createFileRoute } from '@tanstack/react-router';
import { CmMeetingsPage } from 'front/apps/cm/03-pages/MeetingsPage/ui/MeetingsPage';
import { makeCmEventNestedRoute } from 'front/apps/cm/07-shared/lib/cmEventNestedRouteMaker';

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
