import { createFileRoute } from '@tanstack/react-router';
import { TunerApp } from 'front/components/apps/tuner/TunerApp';

export const Route = createFileRoute('/tuner')({
  component: RouteComponent,
});

function RouteComponent() {
  return <TunerApp />;
}
