import { ElectronTsjrpcClient } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { ElectronBasicTsjrpcModel } from 'shared/api/tsjrpc.electtron/basic';

/** WorkDir RPCs target the main window, so they never reach a projector/broadcast window. */
export const electronWorkDirTool = { toWinNum: -1111, winNum: -1000 };

export const electronBasicTsjrpcClient = new (class Basic extends ElectronTsjrpcClient<ElectronBasicTsjrpcModel> {
  constructor() {
    super({
      scope: 'Basic',
    });
  }
})();
