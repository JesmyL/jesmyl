import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { QuestionerBlankListPage } from '$q/pages/BlankListPage/ui/Page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/q/r/')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();

  if (!checkAccess('q', 'EDIT')) return;

  return <QuestionerBlankListPage />;
}
