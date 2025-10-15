import { CmEditorCompositionPage } from '$cm+editor/pages/CompositionPage';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/coms/$comw/$tab')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();

  if (checkAccess('cm', 'COM', 'R')) return <CmEditorCompositionPage />;
}
