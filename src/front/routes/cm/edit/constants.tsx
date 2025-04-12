import { CmEditConstantsPage } from '$cm+editor/pages/EditConstantsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/constants')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CmEditConstantsPage />;
}
