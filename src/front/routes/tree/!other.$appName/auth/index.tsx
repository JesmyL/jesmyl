import { IndexAuthorizePage } from '$index/entities/Authorize';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IndexAuthorizePage />;
}
