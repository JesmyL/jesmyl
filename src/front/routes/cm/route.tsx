import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { CmApp } from '$cm/app/CmApp';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm')({ component: RouteComponent });

function RouteComponent() {
  return (
    <AppDialogProvider title="cm">
      <CmApp />
    </AppDialogProvider>
  );
}
