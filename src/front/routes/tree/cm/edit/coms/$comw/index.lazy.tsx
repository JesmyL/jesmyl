import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/cm/edit/coms/$comw/')({
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
