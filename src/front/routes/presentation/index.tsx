import { PresentationPage } from '#features/broadcast/ui/Page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/presentation/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <PresentationPage />;
}
