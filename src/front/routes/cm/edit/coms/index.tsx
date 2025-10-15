import { CmEditorCompositionsPage } from '$cm+editor/pages/CompositionsPage';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/coms/')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();

  if (checkAccess('cm', 'COM')) return <CmEditorCompositionsPage />;
}
