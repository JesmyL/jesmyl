import { TunerApp } from '$tuner/TunerApp';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tuner')({
  component: RouteComponent,
});

function RouteComponent() {
  return <TunerApp />;
}
