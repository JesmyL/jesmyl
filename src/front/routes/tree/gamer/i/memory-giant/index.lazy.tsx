import { GamerMemoryGiantPage } from '$gamer/pages/MemoryGiantPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/gamer/i/memory-giant/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <GamerMemoryGiantPage />;
}
