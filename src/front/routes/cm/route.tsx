import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { CmApp } from '$cm/app/CmApp';
import { trySendComComments, useTrySendComCommentBlocks } from '$cm/com-comments-manager';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm')({ component: RouteComponent });

function RouteComponent() {
  useTrySendComCommentBlocks();

  return (
    <AppDialogProvider title="cm">
      <CmApp />
    </AppDialogProvider>
  );
}

trySendComComments();
