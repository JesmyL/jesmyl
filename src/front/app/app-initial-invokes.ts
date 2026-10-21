import { soki } from '#shared/soki';
import { schTsjrpcBaseClient } from '#widgets/schedule/tsjrpc/tsjrpc.base';
import { bibleInitialInvokes } from '$bible/shared/lib';
import { bibleTsjrpcBaseClient } from '$bible/shared/lib/tsjrpc';
import { purgeCmEditorCache } from '$cm/shared/lib/cmEditorCache';
import { cmShareTsjrpcBaseClient } from '$cm/shared/tsjrpc';
import {
  authIDB,
  indexDeviceEmojiAtom,
  indexDeviceIdAtom,
  indexIDB,
  indexUserAccessRightsAtom,
  lastUpdatedIconsMd5HashAtom,
} from '$index/shared/state';
import { indexTsjrpcBaseClient, indexTsjrpcClientMethods, schLiveTsjrpcBaseClient } from '$index/shared/tsjrpc';
import { questionerAdminTsjrpcClientBase } from '$q/shared/tsjrpc/admin.tsjrpc';
import { storagesStoresSharesTsjrpcBaseClient } from '$storages/shared/tsjrpc/tsjrpc.base';
import { DeviceId } from 'shared/api';
import { IndexAccessScopeRules } from 'shared/model/index/access-rights';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { appInitEvent } from './store/triggers';

const hasCmEditRight = (rights: IndexAccessScopeRules) => checkUserScopeAccessRight(null, rights, 'cm', 'EDIT');

let isCmEditorInvokesRun = false;
let isCmEditorCachePurgeScheduled = false;

const runCmEditorInvokes = () => {
  if (isCmEditorInvokesRun) return;
  isCmEditorInvokesRun = true;

  void Promise.all([
    import('$cm+editor/shared/lib/cm+editor-initial-invokes'),
    import('$cm+editor/shared/lib/cm-editor.tsjrpc.base'),
  ]).then(([{ cmEditorInitialInvokes }, { cmShareEditorTsjrpcBaseClient }]) => {
    cmShareEditorTsjrpcBaseClient.$$register();
    cmEditorInitialInvokes();
  });
};

/** Editors preload the gated slice; non-editors drop its cached chunks (bootstrap, revocation, logout). */
const syncCmEditorAccess = (rights: IndexAccessScopeRules) => {
  if (hasCmEditRight(rights)) {
    isCmEditorCachePurgeScheduled = false;
    runCmEditorInvokes();
    return;
  }

  if (isCmEditorCachePurgeScheduled) return;

  isCmEditorCachePurgeScheduled = true;
  // A failed pass disarms the flag, so the next rights push retries the purge instead of silently skipping it.
  void purgeCmEditorCache().catch(() => (isCmEditorCachePurgeScheduled = false));
};

export const appInitialInvokes = () => {
  const rights = indexUserAccessRightsAtom.get();

  indexTsjrpcBaseClient.$$register();
  schTsjrpcBaseClient.$$register();
  schLiveTsjrpcBaseClient.$$register();
  bibleTsjrpcBaseClient.$$register();
  cmShareTsjrpcBaseClient.$$register();
  storagesStoresSharesTsjrpcBaseClient.$$register();
  questionerAdminTsjrpcClientBase.$$register();

  bibleInitialInvokes();

  syncCmEditorAccess(rights);
  // Rights may arrive after bootstrap (fresh login or server push `refreshAccessRights`),
  // so both the gated slice load and the cache purge follow the atom instead of a one-shot snapshot.
  indexUserAccessRightsAtom.subscribe(syncCmEditorAccess);

  const getFreshes = async () => {
    appInitEvent.invoke();
    const lastModfiedAt = await indexIDB.get.lastModifiedAt();

    try {
      const deviceId = indexDeviceIdAtom.get();
      if (deviceId === DeviceId.def) {
        const deviceId = await indexTsjrpcClientMethods.getDeviceId();
        indexDeviceIdAtom.set(deviceId);
      }

      const deviceEmoji = indexDeviceEmojiAtom.get();
      if (!deviceEmoji) {
        const deviceEmoji = await indexTsjrpcClientMethods.getDeviceEmoji();
        indexDeviceEmojiAtom.set(deviceEmoji);
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

  soki.onAuthorizeEvent.listen(async () => {
    await indexIDB.remove.lastModifiedAt();
  });

  soki.onTokenInvalidEvent.listen(() => {
    authIDB.remove.auth();
    authIDB.remove.token();
  });
};
