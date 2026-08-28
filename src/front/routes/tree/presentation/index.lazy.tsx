import { PresentationPage } from '#features/broadcast/ui/Page';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/presentation/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <PresentationPage />;
}
