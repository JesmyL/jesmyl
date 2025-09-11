import { EditEERulesPage } from '$cm+editor/pages/EditEERulesPage';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/e-e')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('cm', 'EE', 'R')) return <EditEERulesPage />;
}
