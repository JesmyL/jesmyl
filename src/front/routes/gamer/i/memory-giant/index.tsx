import { GamerMemoryGiantPage } from '$gamer/pages/MemoryGiantPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gamer/i/memory-giant/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <GamerMemoryGiantPage />;
}
