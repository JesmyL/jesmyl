import { EditCompositionsPage } from '$cm+editor/pages/EditCompositionsPage';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/coms/')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();

  if (checkAccess('cm', 'COM')) return <EditCompositionsPage />;
}
