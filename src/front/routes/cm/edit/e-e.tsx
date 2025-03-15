import { EditEERulesPage } from '$cm/pages/EditEERulesPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/e-e')({
  component: RouteComponent,
});

function RouteComponent() {
  return <EditEERulesPage />;
}
