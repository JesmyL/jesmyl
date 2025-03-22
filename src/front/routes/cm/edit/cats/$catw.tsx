import { EditCategoryPage } from '$cm+editor/pages/EditCategoryPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit/cats/$catw')({
  component: RouteComponent,
});

function RouteComponent() {
  return <EditCategoryPage />;
}
