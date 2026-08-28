import { CmEditorPage } from '$cm+editor/app/EditorPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/cm/edit/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CmEditorPage />;
}
