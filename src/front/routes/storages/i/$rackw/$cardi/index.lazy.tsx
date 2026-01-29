import { StoragesRackCardPage } from '$storages/pages/RackCardPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/storages/i/$rackw/$cardi/')({
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
