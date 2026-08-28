import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorChordPage } from '$cm+editor/pages/ChordPage';
import { createFileRoute } from '@tanstack/react-router';
import { checkIsString } from 'shared/utils/checkIs';

export const Route = createFileRoute('/cm/edit/chord')({
  component: RouteComponent,
  validateSearch: search => {
    return {
      newChordName: checkIsString(search.newChordName) ? search.newChordName : undefined,
    };
  },
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('cm', 'CHORD', 'R')) return <CmEditorChordPage />;
}
