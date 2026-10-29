import { makeScheduleRoute } from '#widgets/schedule/complect/makeScheduleRoute';
import { ScheduleUsersPage } from '#widgets/schedule/pages/ScheduleUsersPage';
import { indexIDB } from '$index/shared/state';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';

export const Route = createLazyFileRoute('/schedule-users/$schw/')(
  makeScheduleRoute((() => Route) as never, RouteComponent),
);

function RouteComponent() {
  const { schw } = Route.useParams();
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(+schw), [schw]);

  if (schedule == null) return null;

  return <ScheduleUsersPage schedule={schedule} />;
}
