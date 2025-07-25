import { CmEditCompositionPage } from '$cm+editor/pages/EditCompositionPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/coms/$comw/$tab')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CmEditCompositionPage />;
}
