import { IndexAuthorizationPage } from '$index/parts/auth/IndexAuthorization';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IndexAuthorizationPage />;
}
