import { schTsjrpcBaseClient } from '#widgets/schedule/tsjrpc/tsjrpc.base';
import { indexDeviceIdAtom } from '$index/db/atoms';
import { indexIDB } from '$index/db/index-idb';
import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { indexTsjrpcBaseClient } from '$index/tsjrpc.shares';
import { soki } from 'front/soki';
import { DeviceId } from 'shared/api';

export const appInitialInvokes = () => {
  schTsjrpcBaseClient.$$register();
  indexTsjrpcBaseClient.$$register();

  const getFreshes = async () => {
    const lastModfiedAt = await indexIDB.get.lastModifiedAt();
    const deviceId = indexDeviceIdAtom.get();

    try {
      if (deviceId === DeviceId.def) {
        const deviceId = await indexTsjrpcClientMethods.getDeviceId();
        indexDeviceIdAtom.set(deviceId);
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
