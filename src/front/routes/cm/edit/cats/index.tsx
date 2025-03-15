import { EditCategoriesPage } from '$cm/pages/EditCategoriesPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/cats/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <EditCategoriesPage />;
}
