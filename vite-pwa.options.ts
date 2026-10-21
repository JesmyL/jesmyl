import { cmEditorCacheName } from '$cm/shared/lib/cmEditorCache';
import { VitePWAOptions } from 'vite-plugin-pwa';

export const vitePWAOptions = {
  injectRegister: 'auto',
  strategies: 'generateSW',
  registerType: 'prompt',
  manifestFilename: 'app-manifest-v2.json' as const,
  workbox: {
    cleanupOutdatedCaches: true,
    skipWaiting: false,
    clientsClaim: false,
    navigateFallback: '/index.html',
    manifestTransforms: [
      // `cm-edit-` chunks are built only from the rights-gated CmRedactor slice
      // (see chunkFileNames in vite.config.ts), so they must not be pre-downloaded on install.
      manifest => ({ manifest: manifest.filter(({ url }) => !url.startsWith('assets/cm-edit-')) }),
    ],
    runtimeCaching: [
      {
        // Same-origin only, mirroring src/service-worker.ts. The name is kept in sync with
        // `cmComAudioPlayerCacheName` in $cm/entities/com-audio-player (that module pulls front app code).
        urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/track/'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'audio-cache',
          expiration: { maxEntries: 200, purgeOnQuotaError: true },
        },
      },
      {
        // Editor assets enter the cache only on the first real request (CmRedactor visit
        // or the rights-gated bootstrap import), never at service-worker install time.
        // The bucket name is shared with the front purge logic (cmEditorCache.ts).
        urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/assets/cm-edit-'),
        handler: 'CacheFirst',
        options: {
          cacheName: cmEditorCacheName,
          expiration: { maxEntries: 100, purgeOnQuotaError: true },
        },
      },
    ],
  },
  manifest: {
    name: 'Jesus my Lord',
    short_name: 'JesmyL',
    description: 'Сборник приложений',
    prefer_related_applications: false,
    start_url: '/',
    display: 'standalone',
    theme_color: '#587455',
    background_color: '#587455',
    categories: ['christian', 'христианское', 'песни', 'хвала', 'для Иисуса Христа', 'JesmyL'],
    icons: [
      {
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    share_target: {
      action: '/share',
      method: 'GET',
      enctype: 'application/x-www-form-urlencoded',
      params: {
        title: 'shareText',
        text: 'shareDescription',
      },
    },
    shortcuts: [
      {
        name: 'Песни возрождённых',
        url: '/cm',
      },
    ],
    launch_handler: {
      client_mode: 'focus-existing',
    },
  },
} satisfies Partial<VitePWAOptions>;
