import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { QuestionerApp } from '$q/app/QuestionerApp';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/q')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppDialogProvider title="q">
      <QuestionerApp />
    </AppDialogProvider>
  );
}
