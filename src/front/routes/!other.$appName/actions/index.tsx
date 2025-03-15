import { IndexActionsPage } from '$index/pages/ActionsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/actions/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IndexActionsPage />;
}
