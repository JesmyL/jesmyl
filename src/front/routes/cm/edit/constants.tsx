import { CmEditConstantsPage } from '$cm+editor/pages/EditConstantsPage';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/constants')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('cm', 'CONST', 'R')) return <CmEditConstantsPage />;
}
