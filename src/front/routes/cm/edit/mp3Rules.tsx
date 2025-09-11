import { EditMp3RulesPage } from '$cm+editor/pages/EditMp3RulesPage';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/mp3Rules')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('cm', 'MP3', 'R')) return <EditMp3RulesPage />;
}
