import { editCompositionNavs } from '$cm/editor/pages/compositions/lib/tabs.config';
import { CmEditCompositionPage } from '$cm/pages/EditCompositionPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/coms/$comw')({
  component: RouteComponent,
  validateSearch: (search): { tab?: keyof typeof editCompositionNavs } => {
    return {
      tab: editCompositionNavs[('' + search.tab) as never] ? (('' + search.tab) as never) : 'watch',
    };
  },
});

function RouteComponent() {
  return <CmEditCompositionPage />;
}
