import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { AppNameContext } from '#basis/state/contexts';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName')({ component: RouteComponent });

function RouteComponent() {
  const { appName } = Route.useParams();
  useCurrentAppSetter(appName as never);

  return (
    <AppNameContext value={appName as never}>
      <Outlet />
    </AppNameContext>
  );
}
