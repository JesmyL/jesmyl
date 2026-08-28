import { StoragesRackPage } from '$storages/pages/RackPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/storages/i/$rackw/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <StoragesRackPage rackw={+Route.useParams().rackw} />;
}
