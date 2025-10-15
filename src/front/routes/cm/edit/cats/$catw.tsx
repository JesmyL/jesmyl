import { CmEditorCategoryPage } from '$cm+editor/pages/CategoryPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/cats/$catw')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CmEditorCategoryPage />;
}
