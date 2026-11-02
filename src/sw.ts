/// <reference lib="webworker" />
/// <reference types="vite-plugin-pwa/client" />

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import type { PushNotificationAction, SchedulePushPayload } from 'shared/api/complect/push.model';
import { checkIsArray, checkIsObject, checkIsString } from 'shared/utils/checkIs';

declare const self: ServiceWorkerGlobalScope;

declare global {
  // `actions` exists in browsers but is missing in the bundled webworker lib typings
  interface NotificationOptions {
    actions?: { action: string; title: string }[];
  }
}

const defaultNotificationTitle = 'JesmyL';
const defaultPushPayload: SchedulePushPayload = { title: defaultNotificationTitle, body: '', url: '/' };
const notificationIcon = '/android-chrome-192x192.png';
const fontFileReg = /\.(ttf|otf|woff2)$/;
const maxNotificationActionsCount = 2;

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();
clientsClaim();

registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')));

registerRoute(
  props =>
    props.request.method === 'GET' &&
    props.url.origin === self.location.origin &&
    props.url.pathname.startsWith('/track/'),
  new CacheFirst({ cacheName: 'audio-cache' }),
);

registerRoute(
  props =>
    props.url.origin === self.location.origin &&
    props.url.pathname.startsWith('/resource/') &&
    fontFileReg.test(props.url.pathname),
  new CacheFirst({
    cacheName: 'resource-fonts-v2',
    plugins: [
      new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 7, purgeOnQuotaError: true }),
    ],
  }),
);

registerRoute(
  props => props.url.origin === self.location.origin && props.url.pathname.startsWith('/assets/cm-edit-'),
  new CacheFirst({
    cacheName: 'cm-editor-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 100, purgeOnQuotaError: true })],
  }),
);

const checkIsFilledString = (value: unknown): value is string => checkIsString(value) && !!value;

const takePushActions = (value: unknown): PushNotificationAction[] =>
  !checkIsArray<unknown>(value)
    ? []
    : value
        .filter(
          (action): action is PushNotificationAction =>
            checkIsObject(action) &&
            checkIsFilledString(action.action) &&
            checkIsFilledString(action.title) &&
            checkIsFilledString(action.url),
        )
        .slice(0, maxNotificationActionsCount);

const takePushPayload = (event: PushEvent): SchedulePushPayload => {
  let data: unknown;

  try {
    data = event.data?.json();
  } catch {
    return defaultPushPayload;
  }

  if (!checkIsObject(data)) return defaultPushPayload;

  return {
    title: checkIsString(data.title) && data.title ? data.title : defaultNotificationTitle,
    body: checkIsString(data.body) ? data.body : '',
    url: checkIsString(data.url) ? data.url : '/',
    tag: checkIsString(data.tag) ? data.tag : undefined,
    silent: data.silent === true ? true : undefined,
    actions: takePushActions(data.actions),
  };
};

self.addEventListener('push', event => {
  const payload = takePushPayload(event);

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      tag: payload.tag,
      silent: payload.silent,
      icon: notificationIcon,
      badge: notificationIcon,
      data: { url: payload.url, actions: payload.actions },
      actions: payload.actions?.map(action => ({ action: action.action, title: action.title })),
    }),
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const notificationData: unknown = event.notification.data;
  const data = checkIsObject(notificationData) ? notificationData : null;
  const notificationUrl = data?.url;
  const url =
    takePushActions(data?.actions).find(action => action.action === event.action)?.url ??
    (checkIsString(notificationUrl) ? notificationUrl : '/');
  const absoluteUrl = new URL(url, self.location.origin).href;

  event.waitUntil(
    (async () => {
      const [client] = (await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      })) as WindowClient[];

      if (!client) return self.clients.openWindow(absoluteUrl);

      if (client.url !== absoluteUrl) await client.navigate(absoluteUrl);

      return client.focus();
    })(),
  );
});

self.addEventListener('message', messageEvent => {
  if (messageEvent.data?.type === 'SKIP_WAITING') return self.skipWaiting();
});
