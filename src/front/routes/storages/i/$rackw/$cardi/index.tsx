import { StoragesRackCardPage } from '$storages/pages/RackCardPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/storages/i/$rackw/$cardi/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { cardi, rackw } = Route.useParams();

  return (
    <StoragesRackCardPage
      rackw={+rackw}
      cardi={+cardi}
    />
  );
}
