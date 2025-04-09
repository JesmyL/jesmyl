import { CmPlayerPage } from '$cm/pages/PlayerPage';
import { useAuth } from '$index/atoms';
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
  const auth = useAuth();
  if (auth.level < 3) return null;
  return <CmPlayerPage />;
}
