import { createFileRoute, Navigate } from '@tanstack/react-router';
import {
  remoteBroadcastAskNameSearchParam,
  remoteBroadcastSecretCodeSearchParam,
  remoteBroadcastUserNameSearchParam,
} from 'shared/const/electron';

export const Route = createFileRoute('/remote/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Navigate
      to="/remote/cm"
      search={prev => ({
        ...(prev[remoteBroadcastSecretCodeSearchParam] == null
          ? {}
          : { [remoteBroadcastSecretCodeSearchParam]: prev[remoteBroadcastSecretCodeSearchParam] }),
        ...(prev[remoteBroadcastUserNameSearchParam] == null
          ? {}
          : { [remoteBroadcastUserNameSearchParam]: prev[remoteBroadcastUserNameSearchParam] }),
        ...(prev[remoteBroadcastAskNameSearchParam] == null
          ? {}
          : { [remoteBroadcastAskNameSearchParam]: prev[remoteBroadcastAskNameSearchParam] }),
      })}
    />
  );
}
