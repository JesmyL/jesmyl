import { cmEditorInitialInvokes } from '$cm+editor/processes/cm+editor-initial-invokes';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}

cmEditorInitialInvokes();
