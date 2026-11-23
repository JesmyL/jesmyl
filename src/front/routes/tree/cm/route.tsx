import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { ErrorComponent } from '#routes/ErrorComponent';
import { CmApp } from '$cm/app/CmApp';
import { useCmComCommentTrySendBlocks } from '$cm/entities/com-comment';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm')({
  component: RouteComponent,
  errorComponent: ErrorComponent,
});

function RouteComponent() {
  return <CmAppShell />;
}

function CmAppShell() {
  useCmComCommentTrySendBlocks();

  return (
    <AppDialogProvider title="cm">
      <CmApp />
    </AppDialogProvider>
  );
}
