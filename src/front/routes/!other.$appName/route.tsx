import { AppNameContext } from '#basis/lib/contexts';
import { AppName } from '#basis/model/App.model';
import { routingApps } from '$app/lib/configs';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName')({ component: RouteComponent });

function RouteComponent() {
  const { appName } = Route.useParams();

  return (
    <AppNameContext.Provider value={appName as never}>
      <Outlet />
      {routingApps[appName as AppName]?.footer}
    </AppNameContext.Provider>
  );
}
