import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { cmEditorInitialInvokes } from '$cm+editor/ext';
import { createLazyFileRoute, Outlet } from '@tanstack/react-router';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const Route = createLazyFileRoute('/cm/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (!checkAccess('cm', 'EDIT')) return translateBase(BaseLocaleKey.NoAccess);

  return <Outlet />;
}

cmEditorInitialInvokes();
