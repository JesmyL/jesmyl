import { IndexVisitsDashboardPage } from '$index/pages/VisitsDashboardPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/actions/dash')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IndexVisitsDashboardPage />;
}
