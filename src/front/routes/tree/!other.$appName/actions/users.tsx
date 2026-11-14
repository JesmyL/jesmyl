import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { IndexUserListPage } from '$index/pages/UserListPage/ui/UserListPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/actions/users')({
  component: RouteComponent,
});

// Страница прав доступа в разделе «Взаимодействие»: пускаем только при полном доступе general.ALL.
function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('general', 'ALL')) return <IndexUserListPage />;
}
