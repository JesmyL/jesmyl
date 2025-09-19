import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { QuestionerApp } from '$q/app/QuestionerApp';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/q')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppDialogProvider title="q">
      <QuestionerApp />
    </AppDialogProvider>
  );
}
