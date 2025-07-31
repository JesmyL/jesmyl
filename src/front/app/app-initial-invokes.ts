import { schTsjrpcBaseClient } from '#widgets/schedule/tsjrpc/tsjrpc.base';
import { indexIDB } from '$index/db/index-idb';
import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { soki } from 'front/soki';
import { DeviceId } from 'shared/api';

export const appInitialInvokes = () => {
  schTsjrpcBaseClient.$$register();

  const getFreshes = async () => {
    const lastModfiedAt = await indexIDB.get.lastModifiedAt();
    const deviceId = await indexIDB.get.deviceId();

    try {
      if (deviceId === DeviceId.def) {
        const deviceId = await indexTsjrpcClientMethods.getDeviceId();
        indexIDB.set.deviceId(deviceId);
      }
    } catch (_e) {
      //
    }

    await indexTsjrpcClientMethods.requestFreshes({ lastModfiedAt });
  };

  soki.onBeforeAuthorizeEvent.listen(() => indexIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
