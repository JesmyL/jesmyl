import { cmEditorInitialInvokes } from '$cm+editor/processes/cm+editor-initial-invokes';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
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
