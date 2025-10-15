import { createFileRoute } from '@tanstack/react-router';
import { CmMeetingsPage } from 'front/apps/cm/03-pages/MeetingsPage/ui/MeetingsPage';
import { makeCmEventNestedRoute } from 'front/apps/cm/07-shared/lib/cmEventNestedRouteMaker';

export const Route = createFileRoute('/cm/li/events')(
  makeCmEventNestedRoute({
    path: '/cm/li/events',
    RouteComponent,
  }),
);

function RouteComponent() {
  return <CmMeetingsPage />;
}
