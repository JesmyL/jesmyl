import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/gamer/')({ component: RouteComponent });

function RouteComponent() {
  return <Navigate to="/gamer/i" />;
}
