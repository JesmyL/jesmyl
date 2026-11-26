import { translateBase } from '#basis/locale';
import { localeLastModifiedAtAtom } from '#basis/state/locale';
import { requestRemoteLocalesIfStale } from '#features/broadcast/remote/remote-locale';
import { otherFooterIconAtom } from '#basis/state/otherFooterIconAtom';
import { registerRemoteBroadcastClientBase } from '#basis/tsjrpc.electron/remote-broadcast.cli.base';
import { registerRemoteBroadcastRelay } from '#basis/tsjrpc.electron/remote-broadcast.relay';
import { soki } from '#shared/soki';
import { reloadSW } from '#shared/sw-register';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { schTsjrpcBaseClient } from '#widgets/schedule/tsjrpc/tsjrpc.base';
import { bibleInitialInvokes } from '$bible/shared/lib';
import { bibleTsjrpcBaseClient } from '$bible/shared/lib/tsjrpc';
import { cmEditorCacheMessageType, purgeCmEditorCache } from '$cm/shared/lib/cmEditorCache';
import { cmShareTsjrpcBaseClient } from '$cm/shared/tsjrpc';
import {
  authIDB,
  indexDeviceEmojiAtom,
  indexDeviceIdAtom,
  indexIDB,
  indexUserAccessRightsAtom,
  lastUpdatedIconsMd5HashAtom,
} from '$index/shared/state';
import {
  indexTsjrpcBaseClient,
  indexTsjrpcClientMethods,
  registerSchLiveTsjrpcBaseClient,
  textTransferTsjrpcBaseClient,
} from '$index/shared/tsjrpc';
import { questionerAdminTsjrpcClientBase } from '$q/shared/tsjrpc/admin.tsjrpc';
import { storagesStoresSharesTsjrpcBaseClient } from '$storages/shared/tsjrpc/tsjrpc.base';
import { DeviceId } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { IndexAccessScopeRules } from 'shared/model/index/access-rights';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { jversion } from 'shared/values';
import { toast } from 'sonner';
import { preloadUngatedLazyModules } from './lazy-preloads';
import { appInitEvent } from './store/triggers';

const hasCmEditRight = (rights: IndexAccessScopeRules) => checkUserScopeAccessRight(null, rights, 'cm', 'EDIT');

let isCmEditorInvokesRun = false;
let isCmEditorCachePurgeScheduled = false;

const cacheCmEditorChunksInServiceWorker = () => {
  if (!('serviceWorker' in navigator)) return;

  const message = { type: cmEditorCacheMessageType };

  void navigator.serviceWorker.ready
    .then(registration => (navigator.serviceWorker.controller ?? registration.active)?.postMessage(message))
    .catch(() => null);
};

const runCmEditorInvokes = () => {
  if (isCmEditorInvokesRun) return;
  isCmEditorInvokesRun = true;

  void import('$cm+editor/app/EditorPage').catch(() => null);

  void Promise.all([
    import('$cm+editor/shared/lib/cm+editor-initial-invokes'),
    import('$cm+editor/shared/lib/cm-editor.tsjrpc.base'),
  ]).then(([{ cmEditorInitialInvokes }, { cmShareEditorTsjrpcBaseClient }]) => {
    cmShareEditorTsjrpcBaseClient.$$register();
    cmEditorInitialInvokes();
  });
};

const syncCmEditorAccess = (rights: IndexAccessScopeRules) => {
  if (hasCmEditRight(rights)) {
    isCmEditorCachePurgeScheduled = false;
    cacheCmEditorChunksInServiceWorker();
    runCmEditorInvokes();
    return;
  }

  if (isCmEditorCachePurgeScheduled) return;

  isCmEditorCachePurgeScheduled = true;
  // A failed pass disarms the flag, so the next rights push retries the purge instead of silently skipping it.
  void purgeCmEditorCache().catch(() => (isCmEditorCachePurgeScheduled = false));
};

const checkFreshAppVersion = async () => {
  try {
    const freshVersion = await indexTsjrpcClientMethods.getFreshAppVersion_1(undefined, {
      aborter: new AbortController(),
      timeout: 20_000,
    });

    if (freshVersion.num === 0 || freshVersion.num === jversion.num) return;

    toast(freshVersion.text, {
      ...makeToastKOMoodConfig(),
      duration: Infinity,
      action: { label: translateBase(BaseLocaleKey.Update), onClick: reloadSW },
    });
  } catch (_e) {
    //
  }
};

export const appInitialInvokes = () => {
  const rights = indexUserAccessRightsAtom.get();

  registerRemoteBroadcastClientBase();
  registerRemoteBroadcastRelay();

  indexTsjrpcBaseClient.$$register();
  schTsjrpcBaseClient.$$register();
  registerSchLiveTsjrpcBaseClient();
  textTransferTsjrpcBaseClient.$$register();
  bibleTsjrpcBaseClient.$$register();
  cmShareTsjrpcBaseClient.$$register();
  storagesStoresSharesTsjrpcBaseClient.$$register();
  questionerAdminTsjrpcClientBase.$$register();

  void checkFreshAppVersion();

  bibleInitialInvokes();

  preloadUngatedLazyModules();

  syncCmEditorAccess(rights);
  // Rights may arrive after bootstrap (fresh login or server push `refreshAccessRights`),
  // so both the gated slice load and the cache purge follow the atom instead of a one-shot snapshot.
  indexUserAccessRightsAtom.subscribe(syncCmEditorAccess);

  const getFreshes = async () => {
    appInitEvent.invoke();
    const lastModfiedAt = await indexIDB.get.lastModifiedAt();

    try {
      let isDeviceIdentityAssigned = false;

      const deviceId = indexDeviceIdAtom.get();
      if (deviceId === DeviceId.def) {
        indexDeviceIdAtom.set(await indexTsjrpcClientMethods.getDeviceId());
        isDeviceIdentityAssigned = true;
      }

      const deviceEmoji = indexDeviceEmojiAtom.get();
      if (!deviceEmoji) {
        indexDeviceEmojiAtom.set(await indexTsjrpcClientMethods.getDeviceEmoji());
        isDeviceIdentityAssigned = true;
      }

      if (isDeviceIdentityAssigned) void soki.refreshVisit();
    } catch (_e) {
      //
    }

    const iconPacks = (await indexIDB.tb.iconPacks.toArray()).map(({ key }) => key);

    await indexTsjrpcClientMethods.requestFreshes({
      lastModfiedAt,
      iconPacks,
      iconsMd5Hash: lastUpdatedIconsMd5HashAtom.get(),
      otherFooterIcon: otherFooterIconAtom.get(),
    });

    void indexTsjrpcClientMethods.requestFreshLocales({ lastModifiedAt: localeLastModifiedAtAtom.get() });
    void requestRemoteLocalesIfStale();
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
