import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/gamer/')({ component: RouteComponent });

function RouteComponent() {
  return <Navigate to="/gamer/i" />;
}
