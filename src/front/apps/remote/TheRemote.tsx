import { RemoteBroadcastPage } from '#features/broadcast/remote/RemoteBroadcastPage';
import type { RemoteBroadcastApp } from 'shared/api/tsjrpc.electtron/remote-broadcast';

export const TheRemote = ({ fromList, appName }: { fromList?: string | nil; appName?: RemoteBroadcastApp }) => (
  <RemoteBroadcastPage
    fromList={fromList}
    appName={appName}
  />
);
