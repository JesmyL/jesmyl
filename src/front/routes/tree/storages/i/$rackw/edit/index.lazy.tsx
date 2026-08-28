import { StoragesRackEditPage } from '$storages/pages/RackEditPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/storages/i/$rackw/edit/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { rackw } = Route.useParams();
  return <StoragesRackEditPage rackw={+rackw} />;
}
