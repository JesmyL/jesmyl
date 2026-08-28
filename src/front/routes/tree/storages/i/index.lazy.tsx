import { StoragesListPage } from '$storages/pages/ListPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/storages/i/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <StoragesListPage />;
}
