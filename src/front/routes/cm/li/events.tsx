import { makeCmEventNestedRoute } from '$cm/basis/lib/cmEventNestedRouteMaker';
import { CmMeetingsPage } from '$cm/pages/MeetingsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/li/events')(
  makeCmEventNestedRoute({
    path: '/cm/li/events',
    RouteComponent,
  }),
);

function RouteComponent() {
  return <CmMeetingsPage />;
}
