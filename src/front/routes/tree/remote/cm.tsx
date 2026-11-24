import { TheRemote } from '$remote/TheRemote';
import { createFileRoute } from '@tanstack/react-router';
import {
  remoteBroadcastAskNameSearchParam,
  remoteBroadcastSecretCodeSearchParam,
  remoteBroadcastUserNameSearchParam,
} from 'shared/const/electron';

export const Route = createFileRoute('/remote/cm')({
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();

  return (
    <TheRemote
      fromList={search[remoteBroadcastSecretCodeSearchParam]}
      userName={search[remoteBroadcastUserNameSearchParam]}
      askName={search[remoteBroadcastAskNameSearchParam]}
      appName="cm"
    />
  );
}
