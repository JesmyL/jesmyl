import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { QuestionerBlankListPage } from '$q/pages/BlankListPage/ui/Page';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/q/r/')({
  component: RouteComponent,
});

export function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();

  if (!checkAccess('q', 'EDIT', 'U')) return;

  return <QuestionerBlankListPage />;
}
