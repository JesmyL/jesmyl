import { ElectronTsjrpcClient } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { ElectronPresentationsTsjrpcModel } from 'shared/api/tsjrpc.electtron/presentations';

export const electronPresentationsTsjrpcClientMethods =
  new (class Basic extends ElectronTsjrpcClient<ElectronPresentationsTsjrpcModel> {
    constructor() {
      super({
        scope: 'Presentations1',
      });
    }
  })();
