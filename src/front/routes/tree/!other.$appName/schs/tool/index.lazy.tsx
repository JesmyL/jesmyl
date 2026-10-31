import { makeScheduleRoute } from '#widgets/schedule/complect/makeScheduleRoute';
import { ScheduleToolsPage } from '#widgets/schedule/pages/ScheduleToolsPage';
import { indexIDB } from '$index/shared/state';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';

export const Route = createLazyFileRoute('/!other/$appName/schs/tool/')(
  makeScheduleRoute((() => Route) as never, RouteComponent),
);

function RouteComponent() {
  const { schw } = Route.useSearch();
  const { appName } = Route.useParams();
  const schedule = useLiveQuery(() => (schw == null ? undefined : indexIDB.db.schs.get(schw)), [schw], null);

  if (schedule === null) return;

  if (schedule === undefined)
    return (
      <Navigate
        to="/!other/$appName/schs"
        params={{ appName }}
      />
    );

  return <ScheduleToolsPage schedule={schedule} />;
}
