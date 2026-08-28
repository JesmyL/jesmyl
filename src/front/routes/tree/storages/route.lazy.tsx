import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { storagesInitialInvokes } from '$storages/shared/tsjrpc';
import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/storages')({
  component: RouteComponent,
});

function RouteComponent() {
  useCurrentAppSetter('storages');

  return (
    <AppDialogProvider title="storages">
      <Outlet />
    </AppDialogProvider>
  );
}

storagesInitialInvokes();
