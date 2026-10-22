import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorEventsPage } from '$cm+editor/pages/EventsPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/cm/edit/events')({
  component: RouteComponent,
});

function RouteComponent() {
  const checkAccess = useCheckUserAccessRightsInScope();
  if (checkAccess('cm', 'EVENT', 'R')) return <CmEditorEventsPage />;
}
