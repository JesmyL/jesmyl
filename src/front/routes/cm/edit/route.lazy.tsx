import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { cmEditorInitialInvokes } from '$cm+editor/ext';
import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/cm/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (!checkAccess('cm', 'EDIT')) return <>Нет доступа</>;

  return <Outlet />;
}

cmEditorInitialInvokes();
