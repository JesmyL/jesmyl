import { schTsjrpcBaseClient } from '#widgets/schedule/tsjrpc/tsjrpc.base';
import { bibleTsjrpcBaseClient } from '$bible/processes/tsjrpc';
import { cmShareEditorTsjrpcBaseClient } from '$cm+editor/basis/lib/cm-editor.tsjrpc.base';
import { cmEditorInitialInvokes } from '$cm+editor/processes/cm+editor-initial-invokes';
import { indexUserAccessRightsAtom } from '$index/atoms';
import { schLiveTsjrpcBaseClient } from '$index/complect/translations/live.tsjrpc';
import { indexDeviceIdAtom, lastUpdatedIconsMd5HashAtom } from '$index/db/atoms';
import { indexIDB } from '$index/db/index-idb';
import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { indexTsjrpcBaseClient } from '$index/tsjrpc.shares';
import { soki } from 'front/soki';
import { DeviceId } from 'shared/api';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';

export const appInitialInvokes = () => {
  const rights = indexUserAccessRightsAtom.get();

  indexTsjrpcBaseClient.$$register();
  schTsjrpcBaseClient.$$register();
  schLiveTsjrpcBaseClient.$$register();

  bibleTsjrpcBaseClient.$$register();

  cmShareEditorTsjrpcBaseClient.$$register();
  if (rights && checkUserScopeAccessRight(rights, 'cm', 'EDIT')) cmEditorInitialInvokes();

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
