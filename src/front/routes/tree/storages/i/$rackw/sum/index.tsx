import { StoragesRackSumPage } from '$storages/pages/RackSumPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/storages/i/$rackw/sum/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { rackw } = Route.useParams();
  return <StoragesRackSumPage rackw={+rackw} />;
}
