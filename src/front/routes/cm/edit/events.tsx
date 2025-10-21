import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmMeetingsPage } from '$cm/pages/MeetingsPage';
import { makeCmEventNestedRoute } from '$cm/shared/lib';
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
