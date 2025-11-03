import { StoragesRackCardPage } from '$storages/pages/RackCardPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/storages/i/$rackw/$cardMi/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { cardMi, rackw } = Route.useParams();

  return (
    <StoragesRackCardPage
      rackw={+rackw}
      cardMi={+cardMi}
    />
  );
}
