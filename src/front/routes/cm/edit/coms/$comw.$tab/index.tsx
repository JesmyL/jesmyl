import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/coms/$comw/$tab/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { comw } = Route.useParams();
  return (
    <Navigate
      to="/cm/edit/coms/$comw/$tab"
      params={{ comw, tab: 'watch' }}
    />
  );
}
