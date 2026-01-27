import { IndexDownloadsPage } from '$index/pages/DownloadsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/actions/down/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IndexDownloadsPage />;
}
