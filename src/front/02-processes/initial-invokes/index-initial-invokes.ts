import { indexIDB } from '#basis/lib/idb/index/index';
import { indexSokiInvocatorBaseClient } from '#basis/lib/invocators/index/invocator.base';
import { indexBasicsSokiInvocatorClient } from '#basis/lib/invocators/schedules/fresh-invocator.methods';
import { soki } from '#basis/lib/soki';
import { DeviceId } from 'shared/api';

export const indexInitialInvokes = () => {
  indexSokiInvocatorBaseClient.$$register();

  const getFreshes = async (lastModified: number) => {
    const localDeviceId = await indexIDB.get.deviceId();

    try {
      if (localDeviceId === DeviceId.def) {
        const deviceId = await indexBasicsSokiInvocatorClient.getDeviceId(null);
        indexIDB.set.deviceId(deviceId);
      }
    } catch (e) {}

    await indexBasicsSokiInvocatorClient.requestFreshes(null, lastModified);
  };

  soki.listenOnConnectionOpenEvent(async () => {
    const lastModified = await indexIDB.get.lastModifiedAt();
    getFreshes(lastModified);
  });

  soki.onAuthorizeEvent.listen(() => getFreshes(0));
};
