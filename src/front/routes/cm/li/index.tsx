import { createFileRoute } from '@tanstack/react-router';
import { CmListsPage } from 'front/apps/cm/03-pages/ListsPage/ui/ListsPage';

export const Route = createFileRoute('/cm/li/')({ component: RouteComponent });

function RouteComponent() {
  return <CmListsPage />;
}
