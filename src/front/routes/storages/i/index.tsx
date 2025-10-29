import { StoragesListPage } from '$storages/pages/ListPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/storages/i/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <StoragesListPage />;
}
