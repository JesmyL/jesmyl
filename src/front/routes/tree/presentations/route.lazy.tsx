import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/presentations')({ component: RouteComponent });

function RouteComponent() {
  useCurrentAppSetter('presentations');

  return (
    <AppDialogProvider title="presentations">
      <Outlet />
    </AppDialogProvider>
  );
}
