import { CmMeetingsPage } from '$cm/pages/MeetingsPage';
import { makeCmEventNestedRoute } from '$cm/shared/lib';
import { createFileRoute, useSearch } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/li/events')(
  makeCmEventNestedRoute({
    path: '/cm/li/events',
    RouteComponent,
  }),
);

function RouteComponent() {
  const { schw } = useSearch({ from: '/cm/li/events' });

  return <CmMeetingsPage schw={schw} />;
}
