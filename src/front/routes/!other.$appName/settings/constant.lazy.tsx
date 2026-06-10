import { IndexConstantsPage } from '$index/pages/ConstantsPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/!other/$appName/settings/constant')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IndexConstantsPage />;
}
