import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { CmApp } from '$cm/app/CmApp';
import { useCmComCommentTrySendBlocks } from '$cm/entities/com-comment';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm')({ component: RouteComponent });

function RouteComponent() {
  useCmComCommentTrySendBlocks();

  return (
    <AppDialogProvider title="cm">
      <CmApp />
    </AppDialogProvider>
  );
}
