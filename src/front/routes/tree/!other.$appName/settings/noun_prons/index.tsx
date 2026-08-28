import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { IndexNounPronsRedactorPage } from '$index/pages/NounPronsRedactorPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/settings/noun_prons/')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('general', 'ALL')) return <IndexNounPronsRedactorPage />;
}
