import { CmListsPage } from '$cm/pages/ListsPage/ui/ListsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/li/')({ component: RouteComponent });

function RouteComponent() {
  return <CmListsPage />;
}
