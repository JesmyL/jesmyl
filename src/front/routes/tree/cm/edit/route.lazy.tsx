import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { cmEditorInitialInvokes } from '$cm+editor/ext';
import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/cm/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (!checkAccess('cm', 'EDIT')) return translateBase(it => it.noAccess);

  return <Outlet />;
}

cmEditorInitialInvokes();
