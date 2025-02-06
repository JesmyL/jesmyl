import { indexIDB } from 'front/components/index/db/index-idb';
import { indexSokiInvocatorBaseClient } from 'front/components/index/db/invocators/invocator.base';
import { indexBasicsSokiInvocatorClient } from 'front/components/index/db/invocators/schedules/fresh-invocator.methods';
import { soki } from 'front/soki';
import { DeviceId } from 'shared/api';

export const appInitialInvokes = () => {
  indexSokiInvocatorBaseClient.$$register();

  const getFreshes = async (lastModified: number) => {
    indexBasicsSokiInvocatorClient.requestFreshes(null, lastModified);

    const localDeviceId = await indexIDB.get.deviceId();
    if (localDeviceId === DeviceId.def) {
      const deviceId = await indexBasicsSokiInvocatorClient.getDeviceId(null);
      indexIDB.set.deviceId(deviceId);
    }
  };

  soki.listenOnConnectionOpenEvent(async () => {
    const lastModified = await indexIDB.get.lastModifiedAt();
    getFreshes(lastModified);
  });

  soki.onAuthorizeEvent.listen(async () => {
    await indexIDB.updateLastModifiedAt(0);
    await getFreshes(0);
  });
};
