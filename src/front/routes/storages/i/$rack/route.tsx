import { StoragesRackPage } from '$storages/pages/RackPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/storages/i/$rack')({
  component: RouteComponent,
});

function RouteComponent() {
  return <StoragesRackPage rackw={+Route.useParams().rack} />;
}
