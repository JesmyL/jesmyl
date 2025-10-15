import { CmEditorMp3RulesPage } from '$cm+editor/pages/Mp3RulesPage';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/mp3Rules')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('cm', 'MP3', 'R')) return <CmEditorMp3RulesPage />;
}
