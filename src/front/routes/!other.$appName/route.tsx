import { AppNameContext } from '#basis/lib/contexts';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName')({ component: RouteComponent });

function RouteComponent() {
  const { appName } = Route.useParams();

  return (
    <AppNameContext.Provider value={appName as never}>
      <Outlet />
    </AppNameContext.Provider>
  );
}
