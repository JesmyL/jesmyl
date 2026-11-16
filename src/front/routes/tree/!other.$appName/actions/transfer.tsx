import { IndexTextTransferPage } from '$index/pages/TextTransferPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/actions/transfer')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IndexTextTransferPage />;
}
