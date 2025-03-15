import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/coms/$comw/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { comw } = Route.useParams();
  return (
    <Navigate
      to="/cm/edit/coms/$comw"
      params={{ comw }}
      search={{ tab: 'watch' }}
    />
  );
}
