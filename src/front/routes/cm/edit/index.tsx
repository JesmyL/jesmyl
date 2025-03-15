import { CmEditorPage } from '$cm/pages/EditorPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CmEditorPage />;
}
