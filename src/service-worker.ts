/// <reference lib="webworker" />

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

// import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  props =>
    !props.url.pathname.endsWith('.mp3') &&
    !props.url.pathname.endsWith('.png') &&
    !props.url.pathname.endsWith('.svg') &&
    !props.url.pathname.endsWith('.jpg'),
  new NetworkFirst(),
);

self.addEventListener('message', messageEvent => {
  if (messageEvent.data === 'SKIP_WAITING') return self.skipWaiting();
});
