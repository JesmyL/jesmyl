import { IndexMyFilesPage } from '$index/pages/MyFilesPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/actions/files/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IndexMyFilesPage />;
}
