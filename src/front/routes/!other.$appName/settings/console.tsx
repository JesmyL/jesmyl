import { IndexConsolePage } from '$index/parts/settings/Console';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/settings/console')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IndexConsolePage />;
}
