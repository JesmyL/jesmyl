import { CmEditorCategoriesPage } from '$cm+editor/pages/CategoriesPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/cats/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CmEditorCategoriesPage />;
}
