import { schSokiInvocatorBaseClient } from '#widgets/schedule/invocators/invocator.base';
import { indexIDB } from 'front/components/index/db/index-idb';
import { indexBasicsSokiInvocatorClient } from 'front/components/index/db/invocators/schedules/fresh-invocator.methods';
import { soki } from 'front/soki';
import { DeviceId } from 'shared/api';

export const appInitialInvokes = () => {
  schSokiInvocatorBaseClient.$$register();

  const getFreshes = async () => {
    const lastModfiedAt = await indexIDB.get.lastModifiedAt();
    const localDeviceId = await indexIDB.get.deviceId();

    try {
      if (localDeviceId === DeviceId.def) {
        const deviceId = await indexBasicsSokiInvocatorClient.getDeviceId();
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
