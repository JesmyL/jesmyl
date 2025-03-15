import { createFileRoute } from '@tanstack/react-router';
import { TheTuner } from 'front/components/apps/tuner/TheTuner';

export const Route = createFileRoute('/tuner/i')({
  component: RouteComponent,
});

function RouteComponent() {
  return <TheTuner />;
}
