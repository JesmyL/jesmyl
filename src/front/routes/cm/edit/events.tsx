import { makeCmEventNestedRoute } from '$cm/basis/lib/cmEventNestedRouteMaker';
import { CmMeetingsPage } from '$cm/pages/MeetingsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/events')(
  makeCmEventNestedRoute({
    path: '/cm/edit/events',
    RouteComponent,
  }),
);

function RouteComponent() {
  return <CmMeetingsPage />;
}
