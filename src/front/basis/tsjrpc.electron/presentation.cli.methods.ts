import { ElectronTsjrpcClient } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { ElectronPresentationTsjrpcModel } from 'shared/api/tsjrpc.electtron/presentation';

export const electronPresentationTsjrpcClient =
  new (class Basic extends ElectronTsjrpcClient<ElectronPresentationTsjrpcModel> {
    constructor() {
      super({
        scope: 'Presentation2',
      });
    }
  })();
