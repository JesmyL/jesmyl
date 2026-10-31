import { makeScheduleRoute } from '#widgets/schedule/complect/makeScheduleRoute';
import { indexIDB } from '$index/shared/state';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';

export const Route = createLazyFileRoute('/!other/$appName/schs/day/')(
  makeScheduleRoute((() => Route) as never, RouteComponent),
);

function RouteComponent() {
  const search = Route.useSearch();
  const { schw } = search;
  const { appName } = Route.useParams();
  const schedule = useLiveQuery(() => (schw == null ? undefined : indexIDB.tb.schs.get(schw)), [schw], null);

  if (schedule === null) return;

  return (
    <Navigate
      to="/!other/$appName/schs"
      params={{ appName }}
      search={schedule && { ...search, isOpenSingleDay: true }}
    />
  );
}
