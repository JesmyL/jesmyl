import { EditMp3RulesPage } from '$cm+editor/pages/EditMp3RulesPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/mp3Rules')({
  component: RouteComponent,
});

function RouteComponent() {
  return <EditMp3RulesPage />;
}
