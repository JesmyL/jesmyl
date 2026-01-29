import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorChordPage } from '$cm+editor/pages/ChordPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/cm/edit/chord')({
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
