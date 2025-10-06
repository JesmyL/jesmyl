import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { QuestionerBlankListPage } from '$q/pages/BlankListPage/ui/Page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/q/r/')({
  component: RouteComponent,
});

export function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();

  if (!checkAccess('q', 'EDIT', 'U')) return;

  return <QuestionerBlankListPage />;
}
