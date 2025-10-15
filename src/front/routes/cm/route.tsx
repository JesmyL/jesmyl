import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { createFileRoute } from '@tanstack/react-router';
import { CmApp } from 'front/apps/cm/01-app/CmApp';
import { useCmComCommentTrySendBlocks } from 'front/apps/cm/06-entities/com-comment/lib/useTrySendComCommentBlocks';

export const Route = createFileRoute('/cm')({ component: RouteComponent });

function RouteComponent() {
  useCmComCommentTrySendBlocks();

  return (
    <AppDialogProvider title="cm">
      <CmApp />
    </AppDialogProvider>
  );
}
