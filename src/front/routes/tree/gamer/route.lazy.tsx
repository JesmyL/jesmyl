import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/gamer')({ component: RouteComponent });

function RouteComponent() {
  useCurrentAppSetter('gamer');

  return (
    <AppDialogProvider title="gamer">
      <Outlet />
    </AppDialogProvider>
  );
}
