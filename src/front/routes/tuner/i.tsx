import { TheTuner } from '$tuner/TheTuner';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tuner/i')({
  component: RouteComponent,
});

function RouteComponent() {
  return <TheTuner />;
}
