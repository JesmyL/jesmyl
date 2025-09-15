import { schTsjrpcBaseClient } from '#widgets/schedule/tsjrpc/tsjrpc.base';
import { indexDeviceIdAtom, lastUpdatedIconsMd5HashAtom } from '$index/db/atoms';
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

    const iconPacks = (await indexIDB.tb.iconPacks.toArray()).map(({ key }) => key);

    await indexTsjrpcClientMethods.requestFreshes({
      lastModfiedAt,
      iconPacks,
      iconsMd5Hash: lastUpdatedIconsMd5HashAtom.get(),
    });
  };

  soki.onBeforeAuthorizeEvent.listen(() => indexIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
