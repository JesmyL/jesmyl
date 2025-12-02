import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/gamer')({ component: RouteComponent });

function RouteComponent() {
  useCurrentAppSetter('gamer');

  return (
    <AppDialogProvider title="gamer">
      <Outlet />
    </AppDialogProvider>
  );
}
