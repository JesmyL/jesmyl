import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorChordPage } from '$cm+editor/pages/ChordPage';
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
  if (checkAccess('cm', 'CHORD', 'R')) return <CmEditorChordPage />;
}
