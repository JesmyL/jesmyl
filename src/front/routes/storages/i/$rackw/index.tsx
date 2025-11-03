import { StoragesRackPage } from '$storages/pages/RackPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/storages/i/$rackw/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <StoragesRackPage rackw={+Route.useParams().rackw} />;
}
