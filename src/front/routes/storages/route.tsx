import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { storagesInitialInvokes } from '$storages/shared/tsjrpc';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/storages')({
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
