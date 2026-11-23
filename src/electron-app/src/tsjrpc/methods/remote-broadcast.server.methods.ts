import { TsjrpcElectronAppMethods } from '../init/tsjrpc.electron';
import { ElectronRemoteBroadcastBaseTsjrpcModel } from '../model';

export const electronRemoteBroadcastTsjrpcAppServerMethods =
  new (class RemoteBroadcast extends TsjrpcElectronAppMethods<ElectronRemoteBroadcastBaseTsjrpcModel> {
    constructor() {
      super({
        scope: 'remoteBroadcast',
      });
    }
  })();
