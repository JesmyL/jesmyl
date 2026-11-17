import { translateBase } from '#basis/locale';
import { localeLastModifiedAtAtom } from '#basis/state/locale';
import { otherFooterIconAtom } from '#basis/state/otherFooterIconAtom';
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
  schLiveTsjrpcBaseClient,
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

/**
 * Первая загрузка страницы ещё не управляется service worker, поэтому ждём `ready`
 * и шлём сообщение активному воркеру: он скачает все `cm-edit-` чанки в кэш редактора.
 */
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

/**
 * Редакторы прогревают закрытый правами слайс и чанк страницы редактора и просят service worker
 * закэшировать все `cm-edit-` чанки; остальные сбрасывают их из кэша (бутстрап, отзыв прав, логаут).
 */
const syncCmEditorAccess = (rights: IndexAccessScopeRules) => {
  if (hasCmEditRight(rights)) {
    isCmEditorCachePurgeScheduled = false;
    // Права могли выдать повторно после очистки кэша — прогрев запускаем на каждое подтверждение.
    cacheCmEditorChunksInServiceWorker();
    runCmEditorInvokes();
    return;
  }

  if (isCmEditorCachePurgeScheduled) return;

  isCmEditorCachePurgeScheduled = true;
  // A failed pass disarms the flag, so the next rights push retries the purge instead of silently skipping it.
  void purgeCmEditorCache().catch(() => (isCmEditorCachePurgeScheduled = false));
};

/**
 * Проверка новой версии приложения при старте: запрашиваем серверную версию с таймаутом в 20 секунд
 * и, если она отличается от текущей и известна, показываем тост с кнопкой принудительного обновления.
 * Нулевой num означает, что информации о версии нет, поэтому тост в этом случае не показываем.
 */
const checkFreshAppVersion = async () => {
  try {
    // Таймаут срабатывает только вместе с aborter: soketi запускает отмену запроса лишь при наличии aborter.
    const freshVersion = await indexTsjrpcClientMethods.getFreshAppVersion(undefined, {
      aborter: new AbortController(),
      timeout: 20_000,
    });

    // Совпадение версий или нулевой num (нет данных о версии) — повода для тоста нет.
    if (freshVersion.num === jversion.num || freshVersion.num === 0) return;

    toast(freshVersion.text, {
      ...makeToastKOMoodConfig(),
      // Тост держится до действия пользователя: исчезнувшее уведомление об обновлении бесполезно.
      duration: Infinity,
      action: { label: translateBase(BaseLocaleKey.Update), onClick: reloadSW },
    });
  } catch (_e) {
    // Неудачная проверка версии не должна мешать старту приложения.
  }
};

export const appInitialInvokes = () => {
  const rights = indexUserAccessRightsAtom.get();

  indexTsjrpcBaseClient.$$register();
  schTsjrpcBaseClient.$$register();
  schLiveTsjrpcBaseClient.$$register();
  textTransferTsjrpcBaseClient.$$register();
  bibleTsjrpcBaseClient.$$register();
  cmShareTsjrpcBaseClient.$$register();
  storagesStoresSharesTsjrpcBaseClient.$$register();
  questionerAdminTsjrpcClientBase.$$register();

  // Версию сверяем сразу после регистрации клиентов: запрос уйдёт, как только откроется соединение.
  void checkFreshAppVersion();

  bibleInitialInvokes();

  // Прогреваем ленивые модули без правовых ограничений сразу после старта приложения.
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
