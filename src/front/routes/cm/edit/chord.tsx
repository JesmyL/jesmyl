import { EditChordPage } from '$cm+editor/pages/EditChordPage';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/chord')({
  component: RouteComponent,
  validateSearch: search => {
    return {
      newChordName: typeof search.newChordName === 'string' ? search.newChordName : undefined,
    };
  },
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('cm', 'CHORD', 'R')) return <EditChordPage />;
}
