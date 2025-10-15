import { useAuth } from '$index/atoms';
import { createFileRoute } from '@tanstack/react-router';
import { CmPlayerPage } from 'front/apps/cm/03-pages/PlayerPage/ui/PlayerPage';
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
