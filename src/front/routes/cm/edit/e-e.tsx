import { CmEditorEERulesPage } from '$cm+editor/pages/EERulesPage';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/e-e')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('cm', 'EE', 'R')) return <CmEditorEERulesPage />;
}
