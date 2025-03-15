import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/bible/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate to="/bible/i" />;
}
