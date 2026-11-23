import { TheRemote } from '$remote/TheRemote';
import { createFileRoute } from '@tanstack/react-router';
import { remoteBroadcastSecretCodeSearchParam } from 'shared/const/electron';

export const Route = createFileRoute('/remote/bible')({
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();

  return (
    <TheRemote
      fromList={search[remoteBroadcastSecretCodeSearchParam]}
      appName="bible"
    />
  );
}
