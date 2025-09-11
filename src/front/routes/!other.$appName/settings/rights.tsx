import { AccessRightsPage } from '$index/pages/AccessRightsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/settings/rights')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AccessRightsPage />;
}
