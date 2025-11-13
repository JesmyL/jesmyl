import { CmPlayerPage } from '$cm/pages/PlayerPage';
import { createFileRoute } from '@tanstack/react-router';
import { CmComWid } from 'shared/api';

export const Route = createFileRoute('/cm/player/')({
  component: RouteComponent,
  validateSearch: (search): { comw: CmComWid | und } => {
    return {
      comw: +search.comw! || undefined,
    };
  },
});

function RouteComponent() {
  return <CmPlayerPage />;
}
