import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorCompositionsPage } from '$cm+editor/pages/CompositionsPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/cm/edit/coms/')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();

  if (checkAccess('cm', 'COM')) return <CmEditorCompositionsPage />;
}
