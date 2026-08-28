import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/')({ component: RouteComponent });

function RouteComponent() {
  return <Navigate to="/cm/i" />;
}
