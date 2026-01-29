import { makeScheduleRoute } from '#widgets/schedule/complect/makeScheduleRoute';
import { indexIDB } from '$index/shared/state';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';

export const Route = createLazyFileRoute('/schedule-day/$schw/')(makeScheduleRoute((() => Route) as never, RouteComponent));

function RouteComponent() {
  const { schw } = Route.useParams();
  const schedule = useLiveQuery(() => indexIDB.tb.schs.get(+schw), [schw]);

  if (schedule == null) return;

  return (
    <Navigate
      to="/!other/$appName/schs"
      params={{ appName: 'cm' }}
      search={{ isOpenSingleDay: true, schw: schedule?.w }}
    />
  );
}
