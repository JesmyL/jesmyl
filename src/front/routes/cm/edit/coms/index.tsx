import { EditCompositionsPage } from '$cm+editor/pages/EditCompositionsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/coms/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <EditCompositionsPage />;
}
