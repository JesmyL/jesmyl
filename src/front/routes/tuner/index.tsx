import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/tuner/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate to="/tuner/i" />;
}
