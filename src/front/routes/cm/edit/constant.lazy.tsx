import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorConstantsPage } from '$cm+editor/pages/ConstantsPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/cm/edit/constant')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('cm', 'CONST', 'R')) return <CmEditorConstantsPage />;
}
