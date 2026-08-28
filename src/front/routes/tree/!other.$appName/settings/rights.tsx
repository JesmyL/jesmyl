import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { IndexAccessRightsPage } from '$index/pages/AccessRightsPage/ui/AccessRightsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/settings/rights')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('general', 'ALL')) return <IndexAccessRightsPage />;
}
