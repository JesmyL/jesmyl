import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/presentations/')({ component: RouteComponent });

function RouteComponent() {
  return <Navigate to="/presentations/i" />;
}
