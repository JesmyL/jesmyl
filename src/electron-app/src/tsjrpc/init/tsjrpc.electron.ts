import { makeTSJRPCMethodsMaker } from 'tsjrpc';
import { electronAppServerEventKey, electronAppWinListHolder } from '../../const';
import { ElectronAppWindowInvokeTool } from '../../model';

export const TsjrpcElectronAppMethods = makeTSJRPCMethodsMaker<ElectronAppWindowInvokeTool>({
  isNeedCheckClassName: false,
  send: (invoke, tool) => {
    const promiseWith = Promise.withResolvers();
    try {
      electronAppWinListHolder[tool.toWinNum]?.webContents.send(electronAppServerEventKey, { invoke, tool });

      promiseWith.resolve(0);
    } catch (e) {
      promiseWith.reject('' + e);
    }

    return promiseWith.promise;
  },
});
