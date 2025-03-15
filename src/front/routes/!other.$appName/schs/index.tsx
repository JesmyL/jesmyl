import { makeScheduleRoute } from '#widgets/schedule/complect/makeScheduleRoute';
import { ScheduleWidgetListPage } from '#widgets/schedule/general/ListPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/schs/')(
  makeScheduleRoute((() => Route) as never, RouteComponent),
);

function RouteComponent() {
  return <ScheduleWidgetListPage />;
}
