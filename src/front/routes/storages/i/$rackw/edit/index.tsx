import { StoragesRackEditPage } from '$storages/pages/RackEditPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/storages/i/$rackw/edit/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { rackw } = Route.useParams();
  return <StoragesRackEditPage rackw={+rackw} />;
}
