import { validateRemoteBroadcastSearch } from '$remote/model/search';
import { RemoteApp } from '$remote/RemoteApp';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/remote')({
  validateSearch: validateRemoteBroadcastSearch,
  component: RouteComponent,
});

function RouteComponent() {
  return <RemoteApp />;
}
