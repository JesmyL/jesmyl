import { CmMeetingsPage } from '$cm/pages/MeetingsPage';
import { makeCmEventNestedRoute } from '$cm/shared/lib';
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
