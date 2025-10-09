import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { CmApp } from '$cm/app/CmApp';
import { useTrySendComCommentBlocks } from '$cm/useTrySendComCommentBlocks';
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
