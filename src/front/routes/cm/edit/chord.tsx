import { EditChordPage } from '$cm/pages/EditChordPage';
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
  return <EditChordPage />;
}
