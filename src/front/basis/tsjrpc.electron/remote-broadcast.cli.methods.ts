import { ElectronTsjrpcClient } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { ElectronRemoteBroadcastTsjrpcModel } from 'shared/api/tsjrpc.electtron/remote-broadcast';

export const electronRemoteBroadcastTsjrpcClientMethods =
  new (class RemoteBroadcast extends ElectronTsjrpcClient<ElectronRemoteBroadcastTsjrpcModel> {
    constructor() {
      super({
        scope: 'remoteBroadcast',
      });
    }
  })();
