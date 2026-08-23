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
