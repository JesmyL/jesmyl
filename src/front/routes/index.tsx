import { appInitialInvokes } from '$app/app-initial-invokes';
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: RouteComponent });

function RouteComponent() {
  return <Navigate to="/cm" />;
}

appInitialInvokes();
