import { broadcastNextLiveDataAtom } from '#features/broadcast/atoms';
import { ElectronTsjrpcBaseClient } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { complectIDB } from '$index/shared/state';
import { ElectronPresentationBaseTsjrpcModel } from 'shared/api/tsjrpc.electtron/presentation.base';

export const electronPresentationTsjrpcClientBase =
  new (class Basic extends ElectronTsjrpcBaseClient<ElectronPresentationBaseTsjrpcModel> {
    constructor() {
      super({
        scope: 'Presentation1',
        methods: {
          liveData: async liveData => broadcastNextLiveDataAtom.set(liveData),
          winResize: async ({ h, w }, { winNum }) => {
            const configi = winNum - 1;
            const configs = [...(await complectIDB.get.screenBroadcastConfigs())];

            configs[configi] = { ...configs[configi], proportion: +(w / h).toFixed(2) };
            complectIDB.set.screenBroadcastConfigs(configs);
          },
        },
      });
    }
  })();
