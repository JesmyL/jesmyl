import { makeScheduleRoute } from '#widgets/schedule/complect/makeScheduleRoute';
import { ScheduleCurrentSchwContext } from '#widgets/schedule/complect/lib/contexts';
import { ScheduleWidgetListPage } from '#widgets/schedule/general/ListPage';
import { ScheduleWidgetPage } from '#widgets/schedule/pages/ScheduleWidgetPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/schs/')(
  makeScheduleRoute((() => Route) as never, RouteComponent),
);

function RouteComponent() {
  const { schw, inviteHash } = Route.useSearch();

  if (schw == null) return <ScheduleWidgetListPage />;

  return (
    <ScheduleCurrentSchwContext value={schw}>
      <ScheduleWidgetPage inviteHash={inviteHash} />
    </ScheduleCurrentSchwContext>
  );
}
