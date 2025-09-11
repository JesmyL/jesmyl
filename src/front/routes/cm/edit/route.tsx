import { cmEditorInitialInvokes } from '$cm+editor/processes/cm+editor-initial-invokes';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (!checkAccess('cm', 'EDIT')) return <>Нет доступа</>;

  return <Outlet />;
}

cmEditorInitialInvokes();
