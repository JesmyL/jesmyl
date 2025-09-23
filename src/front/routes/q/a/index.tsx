import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/q/a/')({
  component: RouteComponent,
});

export function RouteComponent() {
  return <Navigate to="/q/r" />;
}
