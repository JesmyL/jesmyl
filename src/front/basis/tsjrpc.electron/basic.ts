import { ElectronTsjrpcClient } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { ElectronBasicTsjrpcModel } from 'shared/api/tsjrpc.electtron/basic';

export const electronBasicTsjrpcClient = new (class Basic extends ElectronTsjrpcClient<ElectronBasicTsjrpcModel> {
  constructor() {
    super({
      scope: 'Basic',
    });
  }
})();
