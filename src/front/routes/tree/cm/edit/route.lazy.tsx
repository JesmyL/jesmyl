import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { cmEditorInitialInvokes } from '$cm+editor/ext';
import { cmEditorComTabChunksPreload } from '$cm+editor/widgets/com-tab';
import { createLazyFileRoute, Outlet } from '@tanstack/react-router';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

let isCmEditorTabChunksPreloaded = false;

const preloadCmEditorTabChunks = () => {
  if (isCmEditorTabChunksPreloaded) return;
  isCmEditorTabChunksPreloaded = true;

  void cmEditorComTabChunksPreload();
};

export const Route = createLazyFileRoute('/cm/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (!checkAccess('cm', 'EDIT')) return translateBase(BaseLocaleKey.NoAccess);

  preloadCmEditorTabChunks();

  return <Outlet />;
}

cmEditorInitialInvokes();
