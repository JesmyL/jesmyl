import { makeTSJRPCMethodsMaker } from 'tsjrpc';
import { electronAppServerEventKey, electronAppWinHolder } from '../../const';

export const TsjrpcElectronAppMethods = makeTSJRPCMethodsMaker<void>({
  isNeedCheckClassName: false,
  send: invoke => {
    const promiseWith = Promise.withResolvers();
    try {
      electronAppWinHolder.win?.webContents.send(electronAppServerEventKey, invoke);
      promiseWith.resolve(undefined);
    } catch (e) {
      promiseWith.reject('' + e);
    }

    return promiseWith.promise;
  },
});
