import { IndexSettingsPage } from '$index/pages/SettingsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/settings/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IndexSettingsPage />;
}
