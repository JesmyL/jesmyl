import { RemoteBroadcastPage } from '#features/broadcast/remote/RemoteBroadcastPage';
import type { RemoteBroadcastApp } from 'shared/api/tsjrpc.electtron/remote-broadcast';

export const TheRemote = ({
  fromList,
  userName,
  askName,
  appName,
}: {
  fromList?: string | nil;
  userName?: string | nil;
  askName?: string;
  appName?: RemoteBroadcastApp;
}) => (
  <RemoteBroadcastPage
    fromList={fromList}
    userName={userName}
    askName={askName}
    appName={appName}
  />
);
