import { VitePWAOptions } from 'vite-plugin-pwa';

export const vitePWAOptions: Partial<VitePWAOptions> = {
  injectRegister: 'auto',
  strategies: 'generateSW',
  registerType: 'autoUpdate',
  workbox: {
    cleanupOutdatedCaches: false,
  },
  manifest: {
    name: 'Jesus my Lord',
    short_name: 'Jes.myL',
    description: 'Сборник приложений',
    prefer_related_applications: false,
    start_url: '.',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#000000',
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
    // window.launchQueue
    file_handlers: [
      {
        action: '/',
        accept: {
          'image/*': ['.jpeg', '.jpg', '.png'],
        },
      },
    ],

    // capture_links: 'existing_client_event',
    // url_handlers: [
    //   {
    //     origin: 'https://jesmyl.ru',
    //   },
    // ],
    // intent_filters: {
    //   scope_url_scheme: 'https',
    //   scope_url_host: 'jesmyl.ru',
    //   scope_url_path: '/',
    // },
  },
};
