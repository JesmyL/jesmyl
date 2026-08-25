import { broadcastNextLiveDataAtom } from '#features/broadcast/atoms';
import { ElectronTsjrpcBaseClient } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { ElectronPresentationBaseTsjrpcModel } from 'shared/api/tsjrpc.electtron/presentation.base';

export const electronPresentationTsjrpcBaseClient =
  new (class Basic extends ElectronTsjrpcBaseClient<ElectronPresentationBaseTsjrpcModel> {
    constructor() {
      super({
        scope: 'Presentation1',
        methods: {
          liveData: async liveData => broadcastNextLiveDataAtom.set(liveData),
        },
      });
    }
  })();
