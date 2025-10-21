import { soki } from '#shared/soki';
import { schTsjrpcBaseClient } from '#widgets/schedule/tsjrpc/tsjrpc.base';
import { bibleTsjrpcBaseClient } from '$bible/shared/lib/tsjrpc';
import { cmEditorInitialInvokes } from '$cm+editor/shared/lib/cm+editor-initial-invokes';
import { cmShareEditorTsjrpcBaseClient } from '$cm+editor/shared/lib/cm-editor.tsjrpc.base';
import {
  indexDeviceIdAtom,
  indexIDB,
  indexUserAccessRightsAtom,
  lastUpdatedIconsMd5HashAtom,
} from '$index/shared/state';
import { indexTsjrpcBaseClient, indexTsjrpcClientMethods, schLiveTsjrpcBaseClient } from '$index/shared/tsjrpc';
import { DeviceId } from 'shared/api';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';

export const appInitialInvokes = () => {
  const rights = indexUserAccessRightsAtom.get();

  indexTsjrpcBaseClient.$$register();
  schTsjrpcBaseClient.$$register();
  schLiveTsjrpcBaseClient.$$register();

  bibleTsjrpcBaseClient.$$register();

  cmShareEditorTsjrpcBaseClient.$$register();
  if (rights && checkUserScopeAccessRight(null, rights, 'cm', 'EDIT')) cmEditorInitialInvokes();

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
