import { TsjrpcElectronAppMethods } from '../init/tsjrpc.electron';
import { ElectronPresentationBaseTsjrpcModel } from '../model';

export const electronPresentationTsjrpcAppMethods =
  new (class Basic extends TsjrpcElectronAppMethods<ElectronPresentationBaseTsjrpcModel> {
    constructor() {
      super({
        scope: 'Presentation1',
      });
    }
  })();
