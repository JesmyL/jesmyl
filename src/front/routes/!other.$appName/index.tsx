import { IndexOtherPage } from '$index/pages/OtherPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/')({ component: RouteComponent });

function RouteComponent() {
  return <IndexOtherPage />;
}
