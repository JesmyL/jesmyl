import { schSokiInvocatorBaseClient } from '#widgets/schedule/invocators/invocator.base';
import { indexIDB } from '$index/db/index-idb';
import { indexBasicsSokiInvocatorClient } from '$index/db/invocators/schedules/fresh-invocator.methods';
import { soki } from 'front/soki';
import { DeviceId, DeviceInfo } from 'shared/api';
import { itIt } from 'shared/utils';

export const appInitialInvokes = () => {
  schSokiInvocatorBaseClient.$$register();

  const getFreshes = async () => {
    const lastModfiedAt = await indexIDB.get.lastModifiedAt();
    const localDeviceId = await indexIDB.get.deviceId();

    try {
      let deviceInfo = DeviceInfo.def;

      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();

          deviceInfo = devices
            .map(device => (device.label && device.deviceId ? `${device.kind}:${device.label},${device.deviceId}` : ''))
            .filter(itIt)
            .join('/') as DeviceInfo;
        } catch (_error) {
          //
        }
      }

      if (localDeviceId === DeviceId.def) {
        const deviceId = await indexBasicsSokiInvocatorClient.getDeviceId({ deviceInfo });
        indexIDB.set.deviceId(deviceId);
      }
    } catch (_e) {
      //
    }

    await indexBasicsSokiInvocatorClient.requestFreshes({ lastModfiedAt });
  };

  soki.onBeforeAuthorizeEvent.listen(() => indexIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
